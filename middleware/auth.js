const CONFIG = require('config');
const JWT = require('jsonwebtoken');

const AUTH = (request, response, next) => {
    const TOKEN = request.header('x-auth-token');

    // Check for token
    if (!TOKEN) response.status(401).json({message: "Token authorization denied"});


    try {
        // Verify token
        const DECODED = JWT.verify(TOKEN, CONFIG.get('jwtSecret'));
        // Add User from payload
        request.user = DECODED;
        next();
    } catch (e) {
        response.status(400).json({message: "Token is not valid"});
    }
    
}

module.exports = AUTH;