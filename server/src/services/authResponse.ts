
import { Request, Response } from "express";
import generateJwtToken from "./generateJwtToken";

const createAuthResponse = (user: any, req: Request, res: Response) => {

    const { accessToken, refreshToken } = generateJwtToken({
        id: user.id,
    });

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // expires: new Date(Date.now() + 15 * 60 * 1000),
        expires: new Date(Date.now() + 1 * 60 * 1000),
        path: '/',
        sameSite: 'lax'
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        expires: new Date(Date.now() + 1 * 60 * 1000),
        path: '/',
        sameSite: 'lax'
    });

    res.json({
        success: true,
        message: "Authentication Successful",
        user: {
            username: user.username,
            email: user.email,
        },
    });
}

export default createAuthResponse;