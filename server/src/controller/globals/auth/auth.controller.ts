import { Request, Response } from 'express';
import User from '../../../database/models/user.models';

const registerUser = async ( req : Request ,  res : Response  ) => {

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
        username : username,
        password : password,
        email : email
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

export default registerUser;