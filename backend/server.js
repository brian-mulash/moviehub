import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 1500

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL_STRING)
    .then(
        server.listen(port, () => {
            console.log("mongodb database connection is sucessful."),
            console.log(`server is running on port ${port}`)
            console.log(`open on http://localhost:${port}`)
        })
    )
    .catch((error) => {
        console.log({error});
        process.exit(1)
    });
