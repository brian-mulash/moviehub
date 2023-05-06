import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";


export default mongoose.model(
    "Review",

    mongoose.Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
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
    }, modelOptions)
)
