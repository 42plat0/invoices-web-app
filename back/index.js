import express from "express";
import "dotenv/config";

import {db, testDbConnection} from "./db.js";
import router from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.FE_API_URL
}))

app.use(express.json())
app.use("/api/v1/invoice", router)


try {
    await testDbConnection()

    app.listen(process.env.PORT,() => {
        console.log("Started on port", process.env.PORT, "!")
    })
} catch (error) {
    console.error(error);    
}
