import { Request, Response } from "express";
import User from "../../../database/models/user.models";
import RefreshToken from "../../../database/models/token.models";
import { envConfig } from "../../../../config/config";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import generateJwtToken from "../../../services/generateJwtToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // Check if the request body is empty
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: "Please provide user details in the request body",
      });
      return;
    }

    // Extracting user details from the request body
    const { username, password, email } = req.body;

    // check if all required fields are provided
    if (!username || !password || !email) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
      return;
    }

    const user = await User.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const { accessToken, refreshToken } = generateJwtToken({
      id: user.id
    });

    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000), 
    });

    // Set tokens in cookies with proper expiration
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 1 * 60 * 1000), 
      path: '/',
      sameSite: 'lax'
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 3 * 60 * 1000), 
      path: '/',
      sameSite: 'lax'
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        username,
        email
      },
    });

  } catch (error: any) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
      return;
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Deactivate existing refresh tokens for this user
    await RefreshToken.update(
      { isActive: false },
      { where: { userId: user.id, isActive: true } }
    );

    const { accessToken, refreshToken } = generateJwtToken({
      id: user.id,
    });

    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000), 
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 1 * 60 * 1000), 
      path: '/',
      sameSite: 'lax'
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 3 * 60 * 1000), 
      path: '/',
      sameSite: 'lax'
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {

    const { refresh_token } = req.cookies;

    if (refresh_token) {
      await RefreshToken.update(
        { isActive: false },
        { where: { token: refresh_token } }
      );
    }

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
    return;

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
    return;
  }
}

export const refreshToken = async (req: Request, res: Response) => {

  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      res.status(401).json({
        success: false,
        message: "Refresh token not provided"
      });
      return;
    }

    jwt.verify(refresh_token, envConfig.jwtRefreshSecret as string, async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "Invalid refresh token"
        });
        return;
      }

      // Check if the refresh token exists in the database
      const storedToken = await RefreshToken.findOne({
        where: {
          userId: decoded.id,
          isActive: true,
          token: refresh_token
        }
      });

      if (!storedToken) {
        res.status(403).json({
          success: false,
          message: "Refresh token not found"
        });
        return;
      }

      // Generate new access token
      const { accessToken } = generateJwtToken({
        id: decoded.id,
        instituteID: decoded.instituteID
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        path: '/',
        sameSite: 'lax'
      });

      res.json({
        success: true,
        message: "Token refreshed successfully"
      });
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}