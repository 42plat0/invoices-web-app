import express from "express";

import { createUser, getUserById, getUserByUsername, getUsers } from "../models/userModel.js";
import { hashPw, isCorrPw } from "../utils/hash.js";
import { validate } from "../utils/validators/validate.js";
import login from "../utils/validators/login.js";
import register from "../utils/validators/register.js";

import {
    getJWTToken,
    addTokenToRes,
    clearToken,
    decodeToken,
} from "../utils/auth.js";
import { protect } from "../utils/pathProtectMW.js";
import { allowedTo } from "../utils/validators/roleCheckMW.js";

const userController = express.Router();

userController.post("/login", login, validate, async (req, res) => {
    try {
        const user = req.body;
        const dbUser = await getUserByUsername(user);

        if (!dbUser) {
            res.status(400).json({ status: "failed", error: dbUser });
            return;
        }

        user.password_hash = await hashPw(user.password);
        if (!isCorrPw(user.password_hash, dbUser.password_hash)) {
            res.status(400).json({ status: "failed", error: "Incorrect pw" });
            return;
        }

        const token = getJWTToken(dbUser.id);
        addTokenToRes(token, res);

        delete(dbUser.password);
        delete(dbUser.password_hash);

        res.status(200).json({ status: "success", user: dbUser});
    } catch (error) {
        console.error(error);
    }
});

userController.post("/register", register, validate, async (req, res) => {
    try {
        const user = req.body;

        user.password_hash = await hashPw(user.password);
        const created = await createUser(user);

        const token = getJWTToken(created.id);
        addTokenToRes(token, res);
        delete(created.password);
        delete(created.password_hash);
        res.status(200).json({ status: "success", user: created });
    } catch (error) {
        console.error(error);
    }
});

userController.post("/logout", async (req, res) => {
    try {
        clearToken(res);
        res.status(200).json({status: "success"})
    } catch (error) {
        console.error(error);
    }
});

userController.get("/me", 
    // Auth middleware
    // TODO perkelti i izoliuota vieta
    async(req, res, next) => {
        try{
            const tok = req.cookies.token;
            const decode = decodeToken(tok);
            const user = await getUserById(decode.id);
            req.user = user
            next();
        } catch(error){
            res.status(400).json({status:"failed", error})
        }

    }, protect, allowedTo("admin", "user"),
    async (req, res) => {
        try {
            res.status(200).json({ status: "success", user: req.user }); 
        } catch (error) {
            console.error(error);
        }
    }
)

userController.get("/all", protect, allowedTo("admin"),
    async (req, res) => {
        try {
            const users = await getUsers();
            res.status(200).json({ status: "success", users }); 
        } catch (error) {
            console.error(error);
        }
    }
)

export default userController;
