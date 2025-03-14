export const isAdmin = (req, res, next) => {
    if (req.payload.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to access this resource." });
    }
    next();
};