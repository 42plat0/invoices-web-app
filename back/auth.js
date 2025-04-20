import jwt from "jsonwebtoken";

const authCookieName = "jwt";

export const createCookie = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const setCookie = (cookie, res) => {
    res?.cookie(authCookieName, cookie, { expires: 900000, httpOnly: true });
};

export const clearCookie = (res) => res.clearCookie(authCookieName);

export const isCookieValid = (cookie) =>
    jwt.verify(cookie, process.env.JWT_SECRET_KEY);
