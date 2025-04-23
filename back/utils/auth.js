import jwt from "jsonwebtoken";

const authCookieName = "jwt";

export const getJWTToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const addTokenToRes = (token, res) => {
    res.cookie("token", token, { maxAge: 900000, httpOnly: true, sameSite:"Lax" });
};

export const clearToken = (res) => res.clearCookie("token");

export const decodeToken = (cookie) => jwt.verify(cookie, process.env.JWT_SECRET_KEY);
