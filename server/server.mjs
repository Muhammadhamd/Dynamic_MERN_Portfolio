import express from "express"
const app = express()
import path from "path"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import v1router from "./v1/index.mjs"
const __dirname = path.resolve()
const mongodbURI =  process.env.mongodbURI || "mongodb+srv://muhammadhamdali572:hamdali99332@cluster0.g7j5dka.mongodb.net/Portfolio?retryWrites=true&w=majority";
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5000', "*"],
    credentials: true
}));

// app.use(reactDOm)
app.use(v1router)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(PORT))


mongoose.connect(mongodbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});