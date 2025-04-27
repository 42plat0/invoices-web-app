export const allowedTo = (...roles) => {
    return async (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)){
                res.status(401).json({status: "failed", error: "no permission"})
                return;
            }
            next();
        } catch (error) {
            console.error(error);
        }   
    }
}