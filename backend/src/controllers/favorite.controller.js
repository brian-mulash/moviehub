import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

//add favorites
const AddFavorite = async (req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId: req.body.mediaId,
        });

        if (isFavorite) {
            return responseHandler.okay(res, isFavorite)
        };

        const favorite = new favoriteModel({
            ...req.body,
            user: req.user.id,
        });

        await favorite.save();

        responseHandler.created(res, favorite);

    }catch {
        responseHandler.error(res)
    }
};

// remove favorites
const RemoveFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.params

        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id: favoriteId
        });

        if (!favorite) {
            return responseHandler.notFound(res)
        };

        await favorite.remove();

        responseHandler.okay(res);
    } catch {
        responseHandler.error(res);
    }
};

//get favorite user
const GetFavoritesOfUser = async () => {
    try {
        const favorite = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");

        responseHandler.okay(res, favorite);

    } catch {
        responseHandler.error(res)
    }
};

export default {
    GetFavoritesOfUser, AddFavorite, RemoveFavorite
};

