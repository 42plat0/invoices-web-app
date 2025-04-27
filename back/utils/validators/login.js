import { body } from "express-validator";

import {getUserByUsername} from "../../models/userModel.js";
import { hashPw, isCorrPw } from "../hash.js";

export default [
    body("username")
        .notEmpty().withMessage("Username field cannot be empty")
        .custom(async (username) => {
            const user = await getUserByUsername({username});

            if (!user){
                throw new Error("Username or password is incorrect");
            }

            return true;
        })
    ,
    body("password")
        .notEmpty().withMessage("Password field cannot be empty")
        .custom(async(password, {req}) => {
            const username = req.body.username;
            const user = await getUserByUsername({username});
            if (!user){
                throw new Error("Username or password is incorrect");
            }
            if (!await isCorrPw(password, user.password_hash))
                throw new Error("Username or password is not correct");

            return true;
        })
    ,
]