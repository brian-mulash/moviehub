import express from "express";
import userRoute from "../routes/user.route.js";

const Route = express.Router();

Route.use('/user', userRoute);

export default Route;