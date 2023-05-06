import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

/* create review */
const CreateReview = async (req, res) => {
    try {
        const { movieId } = req.params

        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body
        });

        await review.save();

        responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user: req.user
        })
    } catch {
        responseHandler.error(res)
    }
};

/* remove or delete review */
const RemoveReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.user.id,
        });

        if (!review) {
            return responseHandler.notFound(res);
        };

        await review.remove();

        responseHandler.okay(res);

    } catch {
        responseHandler.error(res);
    }
};

/* get reviews of user */
const GetReviewOfUser = async () => {
    try {
        const reviews = await reviewModel.find({
            user: req.user.id
        }).sort("-createdAt");

        responseHandler.okay(res, reviews);
    } catch {
        responseHandler.error(res)
    }
};

export default {
    GetReviewOfUser, RemoveReview, CreateReview
};