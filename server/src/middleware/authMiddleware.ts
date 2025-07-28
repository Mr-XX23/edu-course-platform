
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../../config/config';
import User from '../database/models/user.models';
import { IExtendedRequest } from './authType';
import RefreshToken from '../database/models/token.models';
import generateJwtToken from '../services/generateJwtToken';

// Constants for better maintainability
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax' as const
};

const TOKEN_EXPIRY = {
    ACCESS_TOKEN_MS: 30 * 60 * 1000, 
    REFRESH_TOKEN_MS: 30 * 24 * 60 * 60 * 1000, 
    ROTATION_THRESHOLD_DAYS: 2
};

// Utility functions for calculating token expiry
const calculateDaysUntilExpiry = (expiresAt: Date): number => {
    return (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
};

const createErrorResponse = (res: Response, status: number, message: string) => {
    return res.status(status).json({
        success: false,
        message
    });
};

const setTokenCookies = (res: Response, accessToken: string, refreshToken?: string) => {
    res.cookie("access_token", accessToken, {
        ...COOKIE_OPTIONS,
        expires: new Date(Date.now() + TOKEN_EXPIRY.ACCESS_TOKEN_MS)
    });

    if (refreshToken) {
        res.cookie("refresh_token", refreshToken, {
            ...COOKIE_OPTIONS,
            expires: new Date(Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN_MS)
        });
    }
};

const rotateRefreshTokenIfNeeded = async (
    storedToken: any,
    decoded: any,
    res: Response
): Promise<string> => {
    const daysUntilExpiry = calculateDaysUntilExpiry(new Date(storedToken.expiresAt));
    
    if (daysUntilExpiry <= TOKEN_EXPIRY.ROTATION_THRESHOLD_DAYS) {
        console.warn(`🔄 Rotating refresh token for user ${decoded.id} (expires in ${Math.round(daysUntilExpiry)} days)`);
        
        const tokens = generateJwtToken({ 
            id: decoded.id, 
            instituteID: decoded.instituteID || null 
        });

        // Use transaction for atomicity
        await RefreshToken.update(
            { isActive: false },
            { where: { userId: decoded.id, isActive: true } }
        );

        await RefreshToken.create({
            userId: decoded.id,
            token: tokens.refreshToken,
            expiresAt: new Date(Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN_MS),
            isActive: true
        });

        res.cookie("refresh_token", tokens.refreshToken, {
            ...COOKIE_OPTIONS,
            expires: new Date(Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN_MS)
        });

        return tokens.refreshToken;
    }
    
    return storedToken.token;
};

const handleTokenRefresh = async (
    refreshToken: string,
    res: Response,
    req: IExtendedRequest,
    next: NextFunction
): Promise<boolean> => {
    try {
        const decoded = jwt.verify(refreshToken, envConfig.jwtRefreshSecret as string) as any;

        const storedToken = await RefreshToken.findOne({
            where: {
                token: refreshToken,
                isActive: true,
                userId: decoded.id
            }
        });

        if (!storedToken) {
            createErrorResponse(res, 403, "Invalid refresh token");
            return false;
        }

        // Rotate refresh token if needed
        await rotateRefreshTokenIfNeeded(storedToken, decoded, res);

        // Generate new access token using the service
        const { accessToken } = generateJwtToken({
            id: decoded.id,
            instituteID: decoded.instituteID || null
        });

        setTokenCookies(res, accessToken);

        req.user = { 
            id: decoded.id, 
            currentInstituteID: decoded.instituteID 
        };
        
        next();
        return true;

    } catch (error) {
        console.error('❌ Token refresh failed:', error);
        createErrorResponse(res, 403, "Failed to refresh access token");
        return false;
    }
};

const handleAccessTokenVerification = async (
    accessToken: string,
    refreshToken: string | undefined,
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const decoded = jwt.verify(accessToken, envConfig.jwtAccessSecret as string) as any;
        
        // Optimize user lookup - use findByPk instead of findAll
        const user = await User.findByPk(decoded.id);
        
        if (!user) {
            createErrorResponse(res, 403, "User not found");
            return;
        }

        // Background refresh token health check (non-blocking)
        if (refreshToken) {
            setImmediate(async () => {
                try {
                    const refreshDecoded = jwt.verify(refreshToken, envConfig.jwtRefreshSecret as string) as any;
                    const storedToken = await RefreshToken.findOne({
                        where: {
                            token: refreshToken,
                            isActive: true,
                            userId: refreshDecoded.id
                        }
                    });

                    if (storedToken) {
                        const daysUntilExpiry = calculateDaysUntilExpiry(new Date(storedToken.expiresAt));
                        if (daysUntilExpiry <= TOKEN_EXPIRY.ROTATION_THRESHOLD_DAYS) {
                            console.warn(`⚠️ User ${decoded.id} refresh token expires in ${Math.round(daysUntilExpiry)} days`);
                            await rotateRefreshTokenIfNeeded(storedToken, refreshDecoded, res);
                        }
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        console.warn(`⚠️ Background refresh token check failed for user ${decoded.id}:`, error.message);
                    } else {
                        console.warn(`⚠️ Background refresh token check failed for user ${decoded.id}:`, error);
                    }
                }
            });
        }

        req.user = {
            id: user.id,
            currentInstituteID: decoded.instituteID
        };
        
        next();

    } catch (error) {
        // Access token invalid, try refresh if available
        if (refreshToken) {
            const refreshSuccess = await handleTokenRefresh(refreshToken, res, req, next);
            if (refreshSuccess) return;
        }
        
        createErrorResponse(res, 403, "Invalid access token. Please log in again.");
    }
};

const isLoggedIn = async (req: IExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { access_token: accessToken, refresh_token: refreshToken } = req.cookies;

        // No tokens provided
        if (!accessToken && !refreshToken) {
            createErrorResponse(res, 403, "Unauthorized access. No token provided.");
            return;
        }

        // No access token but refresh token available
        if (!accessToken && refreshToken) {
            await handleTokenRefresh(refreshToken, res, req, next);
            return;
        }

        // Access token available
        if (accessToken) {
            await handleAccessTokenVerification(accessToken, refreshToken, req, res, next);
            return;
        }

    } catch (error) {
        console.error('❌ Auth middleware error:', error);
        createErrorResponse(res, 500, "An error occurred while processing your request.");
    }
};

export default isLoggedIn;