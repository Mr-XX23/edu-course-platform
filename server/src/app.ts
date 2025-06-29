import express from 'express';
import authRoute from './routes/globals/auth/auth.route';
import instituteRouter from './routes/institute/instituteRoute';
import instituteCourseRoute from './routes/institute/course/instituteCourseRoute';
import instituteStudentRouter from './routes/institute/student/instituteStudentRoute';
import categoryRouter from './routes/institute/category/categoryRoute';

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/institute", instituteRouter);
app.use("/api/v1/institute/course", instituteCourseRoute);
app.use("/api/v1/institute/student", instituteStudentRouter);
app.use("/api/v1/institute/category", categoryRouter);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Creator API",
  });
});

export default app;