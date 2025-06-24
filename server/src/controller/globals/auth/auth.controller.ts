import { Request, Response } from 'express';
import User from '../../../database/models/user.models';
import bcrypt from 'bcrypt';

const registerUser = async ( req : Request ,  res : Response  ) => {

    // Check if the request body is empty
    if ( !req.body ) {
        return res.status(400).json({
            success: false,
            message: "Please provide user details in the request body",
        });
        return;
    }

    // Extracting user details from the request body
    const { username , password, email } = req.body;

    // check if all required fields are provided
    if ( !username || !password || !email ) {
        return res.status(400).json({
            success : false,
            message : "All fields are required",
        })

        return;
    } 

    await User.create({
        username,
        email,
        password : bcrypt.hashSync(password, 10),
    })
    .then( ( user ) => {
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user : user
        })
    })
    .catch( ( error ) => {
        return res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        })
    });

}

const loginUser = async ( req: Request, res : Response ) {
    const { email, password } = req.body

    if ( !email || !password ) {
        res.status(400).json({
            message : "User not availiable"
        })
        return;
    }

    const data = await User.findAll({
        where : {
            email
        }
    })

    if (data.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Not Registred !"
        });
    } else {
        const isPasswordMatch = bcrypt.compareSync(password, data[0].password)
        if ( isPasswordMatch ) {

        } else {
            res.status(403).json({
                message : "Invalid Credentails"
            })
        }
    }

}

export { registerUser, loginUser};