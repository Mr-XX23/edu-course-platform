import { Request, Response } from "express";
import User from "../../../database/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../../../../config/config";
import generateJwtToken from "../../../services/generateJwtToken";

export const registerUser = async (req: Request, res: Response) => {
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

  await User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
  })
    .then((user) => {
      const token = generateJwtToken({
        id : user.id
      })
      const { id, username, email } = user;
      if ( token.length > 0 ) {
        res.status(201).json({
          success: true,
          message: "User registered successfully",
          token : token,
          user: {
            id,
            username,
            email
          },
        });
      }
      return;
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error.message,
      });
      return;
    });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "User not availiable",
    });
    return;
  }

  const data = await User.findAll({
    where: {
      email,
    },
  });

  if (data.length === 0) {
    res.status(404).json({
      success: false,
      message: "Not Registred !",
    });
    return;
  } else {
    const isPasswordMatch = bcrypt.compareSync(password, data[0].password);

    if (isPasswordMatch) {
      const token = generateJwtToken({
        id: data[0].id,
      });
      res.json({
        token: token,
        message: "Login Successful",
      });
    } else {
      res.status(403).json({
        message: "Invalid Credentials",
      });
    }
    return;
  }
};
