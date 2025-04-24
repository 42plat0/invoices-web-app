import express from "express";
import {
    insertInvoice,
    fetchInvoices,
    deleteInvoice,
    fetchInvoice,
    updateInvoice,
} from "../models/invoiceModel.js";

import {
    getJWTToken,
    addTokenToRes,
    clearToken,
    decodeToken,
} from "./auth.js";

import { createUser, getUserById, getUserByUsername } from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        const token = req?.cookies.token;

        if (!token){
            throw new Error("Not authorized")
        }

        const decode = decodeToken(token);
        const user = await getUserById(decode.id);

        if(!user){
            throw new Error("Not found");
        }
        
        req.user = user;
    } catch (error) {
        console.error(error);
    }finally{
        next();
    }
}