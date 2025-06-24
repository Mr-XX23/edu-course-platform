import express from 'express';
import authRoute from './routes/globals/auth/auth.route';
import instituteRouter from './routes/institute/instituteRoute';

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/institute", instituteRouter);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Creator API",
  });
});

export default app;