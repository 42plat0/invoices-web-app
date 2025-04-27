import { body } from "express-validator";

export default [
    body("client_name")
        .notEmpty().withMessage("Client name cannot be empty"),
    body("status")
        .notEmpty().withMessage("Status cannot be empty")
        .isIn(["draft", "pending", "paid"]).withMessage("Invalid status value"),
    body("due_at")
        .notEmpty().withMessage("Due date cannot be empty")
        .isISO8601().withMessage("Invalid date format"),
    body("amount")
        .notEmpty().withMessage("Amount cannot be empty")
        .isFloat({ min: 0 }).withMessage("Amount must be a positive number")
        .isFloat({max: 9999}).withMessage("Amount must be not larger than 9999")
];