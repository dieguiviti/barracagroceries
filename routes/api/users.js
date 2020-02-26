const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const USER = require('../../models/User');

/* 
    ROUTE:          POST api/users
    DESCRIPTION:    Register a new user
    ACCESS:         Public                                                                                                 */
    ROUTER.post('/', (request, response) => {
        response.send('register');
    });
    
    
    module.exports = ROUTER;