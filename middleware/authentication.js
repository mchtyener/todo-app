const jwt = require('jsonwebtoken');
const env = require('dotenv')
env.config()

exports.verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(" ")[1]
        if (!token) return res.status(401).json({error: 'Token kaydınız bulunmamaktadır.', status: false});
        req.userData = jwt.verify(token, process.env.JTW_SECRET).userData;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token', status: false});
    }
};
