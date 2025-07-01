import { Response, NextFunction } from "express";
import { IExtendedRequest } from "../../../middleware/authType";
import sequelizeObject from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPasswordGenerator from "../../../services/generateRandomPasswordGenerator";

const addTeacher = async (
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    const {
        teacherName,
        teacherEmail,
        teacherPhoneNumber,
        teacherAddress,
        teacherExpertise,
        teacherSalary,
        joiningDate,
        courseId,
    } = req.body;

    if (
        !teacherName ||
        !teacherEmail ||
        !teacherPhoneNumber ||
        !teacherAddress ||
        !teacherExpertise ||
        !teacherSalary ||
        !joiningDate ||
        !courseId
    ) {
        res.status(400).json({ message: "Please provide all required fields." });
        return;
    }

    const teacherImage = req.file ? req.file.path : null;
    const password = generateRandomPasswordGenerator(teacherName);
    try {
        const returnObject = await sequelizeObject.query(
            `
                INSERT INTO teacher_${req.user?.currentInstituteID} (
                    id, teacherName, teacherEmail, teacherPassword, teacherPhoneNumber, teacherAddress, teacherExpertise, teacherSalary, teacherImage, joiningDate
                ) VALUES (
                    gen_random_uuid(), ?, ?, ?, ?, ?, ?, ?, ?, ?
                )`,

            {
                type: QueryTypes.INSERT,
                replacements: [
                    teacherName,
                    teacherEmail,
                    password.hashVersion,
                    teacherPhoneNumber,
                    teacherAddress,
                    teacherExpertise,
                    teacherSalary,
                    teacherImage,
                    joiningDate,
                ],
            }
        );

        if (returnObject && typeof returnObject[1] === "number" && returnObject[1] > 0) {

            const teacherId : { id: string }[] = await sequelizeObject.query(`SELECT id FROM teacher_${req.user?.currentInstituteID} WHERE teacherEmail = ?`, {
                type: QueryTypes.SELECT,
                replacements: [teacherEmail],
            });
            
            await sequelizeObject.query(
                `UPDATE course_${req.user?.currentInstituteID} SET teacherId = ? WHERE id = ?`,
                {
                    type: QueryTypes.UPDATE,
                    replacements: [teacherId[0].id, courseId],
                }
            );
        }
        res.status(201).json({
            success: true,
            message: "Teacher added successfully.",
        });

    } catch (error) {
        console.error("Error adding teacher:", error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

const getTeacher = async (
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    const instituteID = req.user?.currentInstituteID;

    try {
        const teachers = await sequelizeObject.query(
            `SELECT * FROM teacher_${instituteID}`,
            {
                type: QueryTypes.SELECT,
            }
        );

        if (teachers.length === 0) {
            res.status(404).json({ message: "No teachers found." });
            return;
        }

        res.status(200).json({
            success: true,
            data: teachers,
        });
       
    } catch (error) {
        console.error("Error fetching teachers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteTeacher = async (
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    const { teacherId } = req.params;
    const instituteID = req.user?.currentInstituteID;

    try {
        
        await sequelizeObject.query(
            `DELETE FROM teacher_${instituteID} WHERE id = ?`,
            {
                type: QueryTypes.DELETE,
                replacements: [teacherId],
            }
        );

        res.status(200).json({
            success: true,
            message: "Teacher deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting teacher:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { addTeacher, getTeacher, deleteTeacher };