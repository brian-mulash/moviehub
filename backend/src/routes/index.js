import express from "express";
import userRoute from "../routes/user.route.js";
import mediaRoute from "../routes/media.route.js"
import personRoute from "../routes/person.route.js";
import reviewRoute from "../routes/review.route.js";

const Route = express.Router();

Route.use('/user', userRoute);
Route.use("/media", mediaRoute);
Route.use('person', personRoute);
Route.use('review', reviewRoute);

export default Route;