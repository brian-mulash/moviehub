import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options";

export default mongoose.model(
    "Favorite",

    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
        },

        mediaTypes: {
            type: String,
            required: true,
            enum: ['tv', 'movie']
        },

        mediaId: {
            type: String, //not quite sure but still working on it
            required: true,
        },

        mediaTitle: {
            type: String,
            required: true,
        },

        mediaPoster: {
            type: String,
            required: true,
        },

        mediaRate: {
            type: Number,
            required: true,
        },
    }, modelOptions)
)
