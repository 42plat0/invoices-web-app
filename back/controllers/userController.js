import express from "express";

import { isUser, createUser } from "../models/userModel.js";
import { hashPw, isCorrPw } from "../utils/hash.js";

import {
    createCookie,
    setCookie,
    clearCookie,
    isCookieValid,
} from "../utils/auth.js";

const userController = express.Router();

userController.post("/login", async (req, res) => {
    try {
        const user = req.body;

        user.password_hash = await hashPw(user.password);
        const dbUser = await isUser(user);

        if (!dbUser) {
            res.status(400).json({ status: "failed", error: dbUser });
            return;
        }

        if (!isCorrPw(user.password_hash, dbUser.password_hash)) {
            res.status(400).json({ status: "failed", error: "Incorrect pw" });
            return;
        }
        delete(dbUser.password_hash);

        const token = createCookie(user.id);
        setCookie(token, res);
        res.status(200).json({ status: "success", user: dbUser});
    } catch (error) {
        console.error(error);
    }
});

userController.post("/register", async (req, res) => {
    try {
        const user = req.body;

        user.password_hash = await hashPw(user.password);
        const created = await createUser(user);

        const token = createCookie(user.id);
        setCookie(token, res);
        res.status(200).json({ status: "success", created });
    } catch (error) {
        console.error(error);
    }
});

userController.post("/logout", async (req, res) => {
    try {
        clearCookie(res);
        res.status(200).json({status: "success"})
    } catch (error) {
        console.error(error);
    }
});

userController.get("/me", async (req, res) => {
    try {
        res.status(200).json({ status: "success", user: req.user }); 
    } catch (error) {
        console.error(error);
    }
})

export default userController;
