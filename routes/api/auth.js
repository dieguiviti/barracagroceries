const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const USER = require('../../models/User');
const BCRYPT = require('bcryptjs');
const CONFIG = require('config');
const JWT = require('jsonwebtoken');
const AUTH = require('../../middleware/auth');

/* 
    ROUTE:          POST api/auth
    DESCRIPTION:    Authenticate a user for login
    ACCESS:         Public                                                                                                 */
    ROUTER.post('/', (request, response) => {
        let { username, password } = request.body;

        // Basic Validation (CHANGE LATER)
        if ( !username || !password ){
            return response
                            .status(400)
                            .json({ message: "Please fill out all fields"})
        }

        // Check for existing user
        USER
            .findOne({ username })
            .then( user => {
                // Assert if user exists and send response
                if( !user ) return response.status(400).json({message: "No user has been registered that username"})
            
                // Validate Password
                BCRYPT
                    .compare( password, user.password ) // Compare using bcryptjs (returns promise of type: boolean)
                    .then( matches => { 
                        if(!matches) return response.status(400).json({message: "Invalid Password"});

                        // Sign Token
                        JWT.sign(
                            { id: user.id },
                            CONFIG.get('jwtSecret'),
                            { expiresIn: 3600 },
                            ( err, token ) => {
                                // Assert error
                                if (err) throw err;

                                // Send response with session token and safe json user object
                                response.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        username: user.username,
                                        email: user.email
                                    }
                                });
                            }
                        );

                    });
            });

    });


    /* 
    ROUTE:          GET api/auth/user
    DESCRIPTION:    Get user data
    ACCESS:         Private                                                                                                 */
    ROUTER.get('/user', AUTH, (request, response) => {
        USER
            .findById(request.user.id) // find user in db
            .select('-password') // disregard password
            .then( user => response.json(user) ) // then respond with user data

    });


    module.exports = ROUTER;