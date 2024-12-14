const userModel = require('../database/models/usermodel');
const bcrypt = require("bcrypt"); // (Typo fixed: "bycrypt" -> "bcrypt")
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../database/models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user to the request object
        req.user = user;

        // Proceed to the next middleware or route
        return next();
    } catch (error) {
        // Handle JWT verification errors or other issues
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


// give me hello program in js