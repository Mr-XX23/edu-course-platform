// import { NextFunction, Request, Response } from "express"

// const asyncErrorHandler = (fn:Function) => {
//     return (req:Request, res:Response, next:NextFunction) => {
//         fn(req, res, next).catch((error:Error) => {
//             console.error("Error in async handler:", error);
//             res.status(500).json({ 
//                 message: error.message, fullerror: error.stack 
//             });
            
//         });
//     }

// }

// export default asyncErrorHandler;