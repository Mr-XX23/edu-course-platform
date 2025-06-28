import { Response, NextFunction } from 'express';
import { IExtendedRequest } from '../../../middleware/authType';
import sequelizeObject from '../../../database/connection';

const getStudents = async (req: IExtendedRequest, res: Response, next: NextFunction) => {

    try {

        // Validate instituteID
        const students = await sequelizeObject.query(`
            SELECT * FROM students_${req.instituteID}
        `);

        res.status(200).json({
            success: true,
            data: students
        });
        return;
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}

export { getStudents };