// server/utils/authMiddleware.js – verifies Supabase/JWT token
import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "Missing Authorization header" });

    const token = authHeader.split(" ")[1]; // Bearer <token>
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // attach user info (id, email, role)
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};
