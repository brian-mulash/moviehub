import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";


const Route = express.Router({mergeParams: true});

Route.get(
   "/",

   tokenMiddleware.auth,
   reviewController.GetReviewOfUser
)

Route.post(
   "/",

   tokenMiddleware.auth,
   body("mediaId")
      .exists().withMessage("media-id is required")
      .isLength({min: 1}).withMessage("media-id can not be empty"),

   body("content")
      .exists().withMessage("content is required")
      .isLength({min: 1}).withMessage("content can not be empty"),

   body("mediatype")
      .exists().withMessage("media-type is required")
      .custom(type => ["movie", "tv"].includes(type)).withMessage("media-type is invalid"),

   body("mediaTitle")
      .exists().withMessage("media-title is required"),

   body("mediaPoster")
      .exists().withMessage("media-poster is required"),

   requestHandler.validate,
   reviewController.CreateReview,
);

Route.delete(
   "/review-id",

   tokenMiddleware.auth,
   reviewController.RemoveReview,
);

export default Route;