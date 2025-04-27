import { db } from "../db.js";

export const createUser = async(user) => {
    
    const cols = ["username", "email", "password_hash"];

    const [cUser] = await db `
        INSERT INTO users
        ${db(user, cols)}
        RETURNING *;
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
        SELECT id, username, role FROM users
        WHERE id = ${id};  
    `

    return user;
}

export const getUsers = async() => 
    await db `SELECT id, username FROM users`
    