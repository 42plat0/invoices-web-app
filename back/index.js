import express from "express";
import "dotenv/config";

import {db, testDbConnection} from "./db.js";
import userController from "./controllers/userController.js";
import invoiceController from "./controllers/invoiceController.js";
import cors from "cors";
import CookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.FE_API_URL,
    credentials: true
}));

app.use(CookieParser());
app.use(express.json());
app.use("/api/v1/invoice", invoiceController);
app.use("/api/v1/auth", userController);


try {
    await testDbConnection();

    app.listen(process.env.PORT,() => {
        console.log("Started on port", process.env.PORT, "!")
    });
} catch (error) {
    console.error(error);    
}
