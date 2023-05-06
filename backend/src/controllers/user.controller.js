import userModel from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";
import jsonwebtoken from "jsonwebtoken";

// register user
const RegisterUser = async (req, res) => {
    try {
        const  { username, displayName, password } = req.body;

        const checkUser = await userModel.findOne({ username })

        if (checkUser) {
            return responseHandler.badRequest(res, "username already exist")
        }

        const user = new userModel()

        user.displayName = displayName
        user.username = username
        user.setPassword(password)

        await user.save();

        const token = jsonwebtoken.sign(
            {data: user.id},
            process.env.SECRET_TOKEN,
            {expiresIn: "24h"}
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id,
        });

    } catch {
        responseHandler.error(res);
    }
};

//login user
const LoginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select("username password salt id displayName");

        if (!user) {
            return responseHandler.badRequest(res, "user account don't exist")
        };

        if (!user.validPassword(password)) {
            return responseHandler.badRequest(res, "incorrect password")
        };

        const token = jsonwebtoken.sign(
            {data: user.id},
            process.env.SECRET_TOKEN,
            {expiresIn: "24h"}
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id,
        });

    } catch {
        responseHandler.error(res)
    }
};

//update password
const UpdatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await userModel.findById(req.user.id).select("password id salt");

        if (!user) {
            return responseHandler.unAuthorize(res)
        };

        if (!user.validPassword(password)) {
            return responseHandler.badRequest(res, "incorrect password")
        };

        user.setPassword(newPassword)

        await user.save();

        responseHandler.okay(res);

    } catch {
        responseHandler.error(res)
    };
}

//get user info
const GetUserInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)

        if (!user) {
            return responseHandler.notFound(res)
        };

        responseHandler.okay(res, user)

    } catch {
        responseHandler.error(res)
    }
};

export default { RegisterUser, LoginUser, UpdatePassword, GetUserInfo }