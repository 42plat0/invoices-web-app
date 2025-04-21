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

export const isUser = async(user) => {

    const [isUser] = await db`
        SELECT id, username, password_hash FROM users
        WHERE username = ${user.username};
    `

    return isUser;
}
