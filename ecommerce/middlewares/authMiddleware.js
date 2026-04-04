const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            result: false,
            message: "You need to login."
        });
    }
    let parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            result: false,
            message: "Invalid token"
        });
    }

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = authMiddleware;