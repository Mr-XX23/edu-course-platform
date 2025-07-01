import { Request, Response, NextFunction } from 'express';
import { IExtendedRequest } from '../../../middleware/authType';
import sequelizeObject from '../../../database/connection';
import { QueryTypes } from 'sequelize';

const AddCourse = async( req: IExtendedRequest, res: Response, next: NextFunction) => {
    const { courseName, courseDescription, courseDuration, coursePrice, courseLevel, categoryId } = req.body;
    const courseThumbnail = req.file ? req.file.path : null;
    const instituteID = req.user?.currentInstituteID;

    try {
        // Validate the request body
    if (!courseName || !courseDescription || !courseDuration || !coursePrice || !courseLevel || !categoryId) {
        res.status(400).json({
            success: false,
            message: "All fields are required."
        });
        return;
    }

    const returnObject = await sequelizeObject.query(
        `INSERT INTO course_${instituteID} (id, courseName, courseDescription, courseDuration, coursePrice, courseLevel, courseThumbnail, categoryId)
        VALUES(gen_random_uuid(), ?, ?, ?, ?, ?, ?, ?)`,
        {
            replacements: [courseName, courseDescription, courseDuration, coursePrice, courseLevel, courseThumbnail, categoryId],
        }
    )

    if (
        returnObject &&
        typeof returnObject[1] === 'number' &&
        returnObject[1] > 0
    ) {
        res.status(201).json({
            success: true,
            message: "Course created successfully.",
        });
        return;
    } else {
        res.status(400).json({
            success: false,
            message: "Failed to create course.",
        });
        return;
    }

    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
}

const deleteCourse = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const instituteID = req.user?.currentInstituteID;

    try {
        // Validate the courseId
        if (!courseId) {
            res.status(400).json({
                success: false,
                message: "Course ID is required."
            });
            return;
        }
        // Check if the course exists
        const courseExists = await sequelizeObject.query(
            `SELECT * FROM course_${instituteID} WHERE id = ?`,
            {
                type: QueryTypes.SELECT,
                replacements: [courseId]
                
            }
        );

        if ( courseExists) {
            res.status(404).json({
                success: false,
                message: "Course not found."
            });
        return;
        }

        // Delete the course
        await sequelizeObject.query(
            `DELETE FROM course_${req.instituteID} WHERE id = ?`,
            {
                replacements: [courseId],
            }
        );

        res.status(200).json({
            success: true,
            message: "Course deleted successfully.",
        });
        return;

    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
}

const getAllCourses = async ( req: IExtendedRequest, res: Response, next: NextFunction) => {
    const instituteID = req.user?.currentInstituteID;
    try {

        const courses = await sequelizeObject.query(
            `SELECT * FROM course_${instituteID} JOIN category_${instituteID} ON course_${instituteID}.categoryid = category_${instituteID}.id`,
            {
                type: QueryTypes.SELECT
            }   
        );
        
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully.",
            data: courses 
        });
        return;

    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
}

const getCourseById = async (req: IExtendedRequest, res: Response, next: NextFunction) => {

    const { courseId } = req.params;
    const instituteID = req.user?.currentInstituteID;

    try {
        // Validate the courseId
        if (!courseId) {
            res.status(400).json({
                success: false,
                message: "Course ID is required."
            });
            return;
        }

        // Check if the course exists
        const course = await sequelizeObject.query(
            `SELECT * FROM course_${instituteID} WHERE id = ?`,
            {
                replacements: [courseId],
            }
        );

        if (course[0].length === 0) {
            res.status(404).json({
                success: false,
                message: "Course not found."
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Course fetched successfully.",
            data: course[0]
        });
        return;
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
        return;
    }
}

export { AddCourse, deleteCourse, getAllCourses, getCourseById };