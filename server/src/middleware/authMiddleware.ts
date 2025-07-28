
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../../config/config';
import User from '../database/models/user.models';
import { IExtendedRequest } from './authType';
import RefreshToken from '../database/models/token.models';


const isLoggedIn = async (req: IExtendedRequest, res: Response, next: NextFunction) => {

    try {

        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;

        // If the token is not provided, return an error response
        if (!accessToken) {
            if (!refreshToken) {
                res.status(403).json({
                    success: false,
                    message: "Unauthorized access. No token provided."
                });
                return;
            }

            // Try to refresh the access token
            try {
                const decoded = jwt.verify(refreshToken, envConfig.jwtRefreshSecret as string) as any;

                const storedToken = await RefreshToken.findOne({
                    where: {
                        token: refreshToken,
                        isActive: true,
                        userId: decoded.id
                    }
                })

                if (!storedToken) {
                    res.status(403).json({
                        success: false,
                        message: "Invalid refresh token"
                    });
                    return;
                }

                // Generate new access token
                const newAccessToken = jwt.sign(
                    {
                        id: decoded.id,
                        instituteID: decoded.instituteID || null,
                        type: "access",
                    },
                    envConfig.jwtAccessSecret as string,
                    {
                        expiresIn: "1m",
                    }
                );

                // Set new access token in cookie
                res.cookie("access_token", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    expires: new Date(Date.now() + 30 * 60 * 1000),
                    path: '/',
                    sameSite: 'lax'
                });

                req.user = { id: decoded.id, currentInstituteID: decoded.instituteID };
                next();
                return;
            } catch (error) {

                console.error(error);
                res.status(403).json({
                    success: false,
                    message: "Failed to refresh access token"
                });
                return;
            }
        }

        // Verify the access token
        jwt.verify(accessToken, envConfig.jwtAccessSecret as string, async (error: any, result: any) => {
            if (error) {
                res.status(403).json({
                    success: false,
                    message: "Invalid access token. Please log in again."
                });
                return;
            }

            const users = await User.findAll({
                where: { id: result.id }
            });

            if (users.length === 0) {
                res.status(403).json({
                    success: false,
                    message: "User not found."
                });
                return;
            }

            req.user = {
                id: users[0].id,
                currentInstituteID: result.instituteID
            };
            next();

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