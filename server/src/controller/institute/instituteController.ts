import { NextFunction, Response } from "express";
import sequelizeObject from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomIDNumber";
import { IExtendedRequest } from "../../middleware/authType";
import User from "../../database/models/user.models";
import { categoryData } from "../../seed";

const createInstitute = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  //console.log("Creating institute with body:", req.user);
  try {
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
      instituteVatNo,
      institutePanNo,
    } = req.body;

    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(400).json({
        message: "Please provide missing informations",
      });
      return;
    }

    // Check if both vatNo and panNo are missing; allow one to be null.
    if (!instituteVatNo && !institutePanNo) {
      res.status(400).json({
        message:
          "At least one of instituteVatNo or institutePanNo must be provided.",
      });
      return;
    }

    const instituteID = generateRandomNumber();

    await sequelizeObject.query(
      `CREATE TABLE IF NOT EXISTS institute_${instituteID} (
        id CHAR(36) NOT NULL PRIMARY KEY,
        instituteName VARCHAR(255) NOT NULL,
        instituteEmail VARCHAR(255) NOT NULL UNIQUE,
        institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
        instituteAddress VARCHAR(255) NOT NULL,
        instituteVatNo VARCHAR(255) UNIQUE,
        institutePanNo VARCHAR(255) UNIQUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    if (req.user) {
      // const user = await User.findByPk(req.user.id);
      // user?.currentInstituteID = instituteID;
      // await user?.save();

      await User?.update(
        {
          currentInstituteID: String(instituteID),
          role: "institution",
        },
        {
          where: { id: req.user.id },
        }
      )
        .then(() => {
          console.log("User's current institute updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating user's current institute:", error);
        });
    }

    req.instituteID = instituteID;

    await sequelizeObject.query(
      `INSERT INTO institute_${instituteID}(
         id,instituteName,instituteEmail,institutePhoneNumber,instituteAddress,instituteVatNo,institutePanNo
        )
        VALUES (
        gen_random_uuid(), ?, ?, ?, ?, ?, ?
        )`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          instituteVatNo || null,
          institutePanNo || null,
        ],
      }
    );
    next();
  } catch (error) {
    console.error("Error creating institute:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

const intituteCreatedByUserHistory = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await sequelizeObject.query(`
            CREATE TABLE IF NOT EXISTS institute_creation_history (
                id UUID NOT NULL PRIMARY KEY,
                userId UUID REFERENCES users(id),
                instituteId INT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);

    if (req.user && req.instituteID) {
      await sequelizeObject.query(
        `
            INSERT INTO institute_creation_history (
                id, userId, instituteId
            ) VALUES (
                gen_random_uuid(), ?, ?::int
            )`,
        {
          replacements: [req.user?.id, req.instituteID],
        }
      );

      console.log("Institute creation history recorded successfully.");
      next();
    } else {
      console.error("User or institute ID is not available in the request.");
      return;
    }
  } catch (error) {
    console.error("Error fetching institute creation history:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

const createCategory = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await sequelizeObject.query(`
            CREATE TABLE IF NOT EXISTS category_${req.instituteID} (
                id CHAR(36) NOT NULL PRIMARY KEY,
                categoryName VARCHAR(255) NOT NULL,
                categoryDescription TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);

    categoryData.forEach( async (category) => {
        await sequelizeObject.query(`
            INSERT INTO category_${req.instituteID} (id, categoryName, categoryDescription)
            VALUES (gen_random_uuid(), ? , ?)
        `, {
            replacements: [category.categoryName, category.CategoryDescription]
        });
    });

    res.status(201).json({
      success: true,
      message: "Institute Created",
      instituteID: req.instituteID,
    });
    next();
  } catch (error) {
    console.error("Error creating category table:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

const createTeacher = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await sequelizeObject.query(`
            CREATE TABLE IF NOT EXISTS teacher_${req.instituteID} (
                id CHAR(36) NOT NULL PRIMARY KEY,
                teacherName VARCHAR(255) NOT NULL,
                teacherEmail VARCHAR(255) NOT NULL UNIQUE,
                teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
                teacherPassword VARCHAR(255) NOT NULL,
                teacherAddress VARCHAR(255) NOT NULL,
                teacherExpertise VARCHAR(255) NOT NULL,
                teacherSalary VARCHAR(255) NOT NULL,
                teacherImage VARCHAR(255),
                joiningDate DATE NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    next();
  } catch (error) {
    console.error("Error creating teacher table:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

const createdStudent = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await sequelizeObject.query(`
            CREATE TABLE IF NOT EXISTS student_${req.instituteID} (
                id CHAR(36) NOT NULL PRIMARY KEY,
                studentName VARCHAR(255) NOT NULL,
                studentEmail VARCHAR(255) NOT NULL UNIQUE,
                studentPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
                studentAddress VARCHAR(255) NOT NULL,
                enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                studentImage VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    next();
  } catch (error) {
    console.error("Error creating teacher table:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

const createCourse = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await sequelizeObject.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'courselevel_enum') THEN
                    CREATE TYPE courselevel_enum AS ENUM ('beginner', 'intermediate', 'advanced');
                END IF;
            END$$;
        `);

    await sequelizeObject.query(`
            CREATE TABLE IF NOT EXISTS course_${req.instituteID} (
                id CHAR(36) NOT NULL PRIMARY KEY,
                courseName VARCHAR(255) NOT NULL,
                courseDescription TEXT NOT NULL,
                courseDuration VARCHAR(255) NOT NULL,
                coursePrice VARCHAR(255) NOT NULL,
                courselevel courselevel_enum NOT NULL,
                courseThumbnail VARCHAR(255),
                categoryId CHAR(36) NOT NULL REFERENCES category_${req.instituteID}(id),
                teacherId CHAR(36) REFERENCES teacher_${req.instituteID}(id),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);
  } catch (error) {
    console.error("Error creating teacher table:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
};

export {
  createInstitute,
  intituteCreatedByUserHistory,
  createCategory,
  createTeacher,
  createdStudent,
  createCourse,
};
