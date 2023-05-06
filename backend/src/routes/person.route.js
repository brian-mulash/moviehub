import express from "express";
import personController from "../controllers/person.controller.js";


const Route = express.Router({ mergeParams: true });

Route.get("/:person-id/medias", personController.PersonMedias);

Route.get("/:person-id", personController.PersonDetail);



export default Route;