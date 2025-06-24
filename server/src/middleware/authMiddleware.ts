
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../../config/config';
import User from '../database/models/user.models';
import { IExtendedRequest } from './authType';


const isLoggedIn = (req: IExtendedRequest, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        // If the token is not provided, return an error response
        if (!token) {
            res.status(403).json({
                success: false,
                message: "Unauthorized access. No token provided."
            });

            return; 
        }

        // Verify the token
        jwt.verify(token, envConfig.jwtSecret as string, async (error, result: any) => {
            if (error) {
                res.status(403).json({
                    success: false,
                    message: "Invalid token."
                });
                return;
            }

            // If the token is valid, attach the user information to the request
            await User.findAll({
                where: {
                    id: result.id
                }
            }).then(users => {
                if (users.length === 0) {
                    res.status(403).json({
                        success: false,
                        message: "User not found."
                    });
                    return;
                }

                req.user = users[0];
                next();
            }).catch(err => {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: "Internal server error."
                });
                return;
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request."
        });
        return;
    }

    

}

export default isLoggedIn;