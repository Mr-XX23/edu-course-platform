import { Router, Request } from "express";
import isLoggedIn from "../../middleware/authMiddleware";

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

const healthCheckRoute = Router();

healthCheckRoute.get("/", isLoggedIn, (req, res) => {
  res.json({
    status: "OK",
    data: req?.user,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

export default healthCheckRoute;
