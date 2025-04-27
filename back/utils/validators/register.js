import { body } from "express-validator";
import { getUserByEmail, getUserByUsername } from "../../models/userModel.js";

export default [
    body("username")
        .notEmpty().withMessage("Username field cannot be empty")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .custom(async (username) => {
            const user = await getUserByUsername({ username });
            if (user) {
                throw new Error("Username is already taken");
            }
            return true;
        }),
    body("email")
        .notEmpty().withMessage("Email field cannot be empty")
        .isEmail().withMessage("Invalid email format")
        .custom(async(email) => {
            if (await getUserByEmail(email)){
                throw new Error("Email is already taken")
            }
            return true;
        }),
    body("password")
        .notEmpty().withMessage("Password field cannot be empty")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("conf_password")
        .notEmpty().withMessage("Confirm password field cannot be empty")
        .custom((conf_password, { req }) => {
            if (conf_password !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
];