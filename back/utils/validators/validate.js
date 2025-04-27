import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            const errorsString = errors
                .array()
                .map((err) => err.msg || "Unknown validation error")

            return res.status(400).json({
                status: "failed",
                errors: errorsString[0],
            });
        }
        next();

    } catch (error) {
        next(error);
    }
}    