import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from  "../controllers/user.controller.js";
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const Route = express.Router();

/* register user route */
Route.post(
    "/register",

    body("username")
        .exists().withMessage("username is required")
        .isLength({min: 8}).withMessage("username must have a minimum of 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({username: value})

            if(user) {
                return Promise.reject("username already exists")
            }
        }),

    body("password")
        .exists().withMessage("password is required")
        .isLength({min: 8}).withMessage("password must have a minimum of 8 characters"),

    body("confirmedPassword")
        .exists().withMessage("confirm-password required")
        .isLength({min: 8}).withMessage("confirm-password must have a minimum of 8 characters")
        .custom(async value => {
            if (value !== req.body.password ) throw new Error("confirm-password not matched")

            return true
        }),

    body("displayName")
        .exists().withMessage("display-name is required")
        .isLength({min: 8}).withMessage("display-name must have a minimum of 8 characters"),

    requestHandler.validate,
    userController.RegisterUser
)

/* login user  */
Route.post(
    "/login",

    body("username")
        .exists().withMessage("username is required")
        .isLength({min: 8}).withMessage("username must have a minimum of 8 characters"),

    body("password")
        .exists().withMessage("password is required")
        .isLength({min: 8}).withMessage("password must have a minimum of 8 characters"),

    requestHandler.validate,
    userController.LoginUser,
)

/* update user password */
Route.put(
    "/update-password",

    tokenMiddleware.auth,
    body("password")
        .exists().withMessage("password is required")
        .isLength({min: 8}).withMessage("password must have a minimum of 8 characters"),

    body("newPassword")
        .exists().withMessage("new-password is required")
        .isLength({min: 8}).withMessage("new-password must have a minimum of 8 characters"),
    
    body("confirmPassword")
        .exists().withMessage("confirm-password is required")
        .isLength({min: 8}).withMessage("confirm-password must have a minimum of 8 characters")
        .custom(async value => {
            if (value !== req.body.newPassword ) throw new Error("confirm-password not matched")

            return true
        }),
    
    requestHandler.validate,
    userController.UpdatePassword,
)

/* get user info */
Route.get(
    "/info",

    tokenMiddleware.auth,
    userController.GetUserInfo,
)

/* get user favorite */
Route.get(
    "/favorites",

    tokenMiddleware.auth,
    favoriteController.GetFavoritesOfUser,
)

/* create favorites */
Route.post(
    "/favorites",

    tokenMiddleware.auth,
    body("mediatype")
        .exists().withMessage("media-type is required")
        .custom(type => ["movie", "tv"].includes(type)).withMessage("media-type is invalid"),

    body("mediaId")
        .exists().withMessage("media-id is required")
        .isLength({min: 1}).withMessage("media-id can not be empty"),

    body("mediaTitle")
        .exists().withMessage("media-title is required"),

    body("mediaPoster")
        .exists().withMessage("media-poster is required"),

    body("mediaRate")
        .exists().withMessage("media-rate is required"),

    requestHandler.validate,    
    favoriteController.AddFavorite
);

/* delete favorites */
Route.delete(
    "/favorites/:favoriteId",

    tokenMiddleware.auth,
    favoriteController.RemoveFavorite,
)

export default Route