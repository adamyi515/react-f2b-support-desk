const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Store the token.
            token = req.headers.authorization.split(' ')[1];

            // Verify token => This should return an object with a property of id.
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            // Get the user.
            const user = await User.findById(decoded.id).select('-password');
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized.')
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized.');
    }

}

module.exports = {
    authMiddleware
}