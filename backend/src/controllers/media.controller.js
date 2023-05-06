import userModel from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import favoriteModel from "../models/favorite.model.js;"
import reviewModel from "../models/review.model.js;"
import tokenMiddleware from "../middlewares/token.middleware.js";

// get media list
const GetMediaList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;
        
        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page })

        return responseHandler.okay(res, response)
    } catch {
        responseHandler.error(res)
    }
};

// get media genres
const GetMediaGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;

        const response = await tmdbApi.mediaGenres({ mediaType })

        return response = responseHandler.okay(res, response)
    } catch {
        responseHandler.error(res)
    }
};

//search media
const SearchMedia = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const{ query, page } = req.query;

        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });

        responseHandler.okay(res, response)

    } catch {
        responseHandler.error(res)
    }
};

//get media detail
const GetMediaDetail = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params

        const params = { mediaType, mediaId }

        const media = await tmdbApi.mediaDetail(params);

        media.credits = await tmdbApi.mediaCredits(params)

        const videos = await tmdbApi.mediaVideos(params)

        media.videos = videos

        const recommend = await tmdbApi.mediaRecommend(params)

        media.recommend = recommend.results

        media.images = await tmdbApi.mediaImages(params)

        const tokenDecoded = tokenMiddleware.tokenDecode(req)

        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data)

            if (user) {
                const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId })
                media.isFavorite = isFavorite !== null
            }
        }

        media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt")

        responseHandler.okay(res, media);
    } catch {
            responseHandler.error(res)
    }
};

export default {
    GetMediaList, GetMediaGenres, GetMediaDetail, SearchMedia
};