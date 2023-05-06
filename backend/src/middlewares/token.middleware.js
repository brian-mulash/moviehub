import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"]

        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1]

            return jsonwebtoken.verify(
                token,
                process.env.SECRET_TOKEN
            );
        }

        return false
    } catch {
        return false
    }
};

const auth = async(req, res, next) => {
    const tokenDecoded = tokenDecoded(req)

    if (!tokenDecode) return responseHandler.unAuthorize(res);
    
    const user = await userModel.findById(tokenDecoded.data);

    if (!user) return responseHandler.unAuthorize(res);

    req.user = user;

    next();

};

export default { auth, tokenDecode }