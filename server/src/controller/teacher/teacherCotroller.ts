import { Request, Response } from "express";
import sequelizeObject from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import generateJwtToken from "../../services/generateJwtToken";

interface ITeacherLoginRequest {
  id: string;
  teacherEmail: string;
  teacherPassword: string;
  teacherInstituteId: string;
}

const teacherLogin = async (req: Request, res: Response) => {
  const { teacherEmail, teacherPassword, teacherInstituteId } = req.body;

  if (!teacherEmail || !teacherPassword || !teacherInstituteId) {
    res.status(400).json({ message: "Please provide all required fields." });
    return;
  }

  const teacher: ITeacherLoginRequest[] = await sequelizeObject.query(
    `SELECT * FROM teacher_${teacherInstituteId} WHERE teacherEmail = ?`,
    {
      type: QueryTypes.SELECT,
      replacements: [teacherEmail],
    }
  );

  if (teacher.length === 0) {
    res.status(404).json({ message: "Teacher not found." });
    return;
  }

  const isPasswordMatch = bcrypt.compareSync(
    teacherPassword,
    teacher[0].teacherPassword
  );

  if (!isPasswordMatch) {
    
    res.status(401).json({ message: "Invalid password." });
    return;

  } else if (teacher[0].teacherInstituteId !== teacherInstituteId) {
    
    res
      .status(403)
      .json({ message: "You are not authorized to access this institute." });

    return;

  } else {

    const token = generateJwtToken({
        id: teacher[0].id,
        instituteID: teacherInstituteId,
    });

    if (!token) {
      res.status(500).json({ message: "Failed to generate token." });
      return;
    }

    res.status(200).json({
      token: token,
      message: "Login successful.",
    });
    return;
  }
};


export { teacherLogin };