import express from "express";
import mediaController from "../controllers/media.controller.js"

const Route = express.Router({ mergeParams: true });

Route.get("/search", mediaController.SearchMedia);  //searching

Route.get("/genres", mediaController.GetMediaGenres); //generting genres of medias

Route.get("/detail/:media-id", mediaController.GetMediaDetail); //get media details using media-id

Route.get("/:media-category", mediaController.GetMediaList); //get media-category using media-list

export default Route;