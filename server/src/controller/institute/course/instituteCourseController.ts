import { Request, Response, NextFunction } from 'express';
import { IExtendedRequest } from '../../../middleware/authType';
import sequelizeObject from '../../../database/connection';

const AddCourse = async( req: IExtendedRequest, res: Response, next: NextFunction) => {
    const { courseName, courseDescription, courseDuration, coursePrice, courseLevel, courseThumbnail } = req.body;

    try {
        // Validate the request body
    if (!courseName || !courseDescription || !courseDuration || !coursePrice || !courseLevel) {
        res.status(400).json({
            success: false,
            message: "All fields are required."
        });
        return;
    }

    const returnObject = await sequelizeObject.query(
        `INSERT INTO course_${req.instituteID} (id, courseName, courseDescription, courseDuration, coursePrice, courseLevel, courseThumbnail)
        VALUES(UUID(), ?, ?, ?, ?, ?, ?)`,
        {
            replacements: [courseName, courseDescription, courseDuration, coursePrice, courseLevel, courseThumbnail, courseThumbnail || ""],
        }
    )

    console.log("Course created successfully:", returnObject);
    res.status(201).json({
        success: true,
        message: "Course created successfully.",
        data: returnObject
    });
    return;

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
            `SELECT * FROM course_${req.instituteID} WHERE id = ?`,
            {
                replacements: [courseId],
                
            }
        );

        if ( courseExists[0].length === 0 ) {
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
    try {

        const courses = await sequelizeObject.query(
            `SELECT * FROM course_${req.instituteID}`
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
            `SELECT * FROM course_${req.instituteID} WHERE id = ?`,
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