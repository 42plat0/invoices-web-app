import { db } from "../db.js";
import { hashPw, isCorrPw } from "../utils/hash.js";

export const createUser = async(user) => {
    
    const cols = ["username", "email", "password_hash"];

    const [cUser] = await db `
        INSERT INTO users
        ${db(user, cols)}
        RETURNING id, username, email;
    `
    return cUser;
}

export const getUserByUsername = async(user) => {

    const [isUser] = await db`
        SELECT * FROM users
        WHERE username = ${user.username};
    `

    return isUser;
}

export const getUserById = async(id) => {

    const [user] = await db`
        SELECT id, username FROM users
        WHERE id = ${id};  
    `

    return user;
}