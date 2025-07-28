import express from 'express';
import authRoute from './routes/globals/auth/auth.route';
import instituteRouter from './routes/institute/instituteRoute';
import instituteCourseRoute from './routes/institute/course/instituteCourseRoute';
import instituteStudentRouter from './routes/institute/student/instituteStudentRoute';
import categoryRouter from './routes/institute/category/categoryRoute';
import instituteTeacherRouter from './routes/institute/teacher/instituteTeacherRoute';
import teacherRoute from './routes/teacher/teacherRoute';
import cors from 'cors';
import { envConfig } from '../config/config';
import cookieParser from "cookie-parser";

const app = express();

// Middleware to set security headers
app.disable('x-powered-by');

// Middleware to handle CORS
app.use(cors({
  origin: envConfig.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
}));

// Middleware to parse JSON bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Global authentication routes
app.use("/api/v1/auth", authRoute);


// institute routes
app.use("/api/v1/institute", instituteRouter);
app.use("/api/v1/institute/course", instituteCourseRoute);
app.use("/api/v1/institute/student", instituteStudentRouter);
app.use("/api/v1/institute/category", categoryRouter);
app.use("/api/v1/institute/teacher", instituteTeacherRouter);

// Teacher routes
app.use("/api/v1/teacher", teacherRoute);

export default app;