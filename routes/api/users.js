const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const USER = require('../../models/User');
const BCRYPT = require('bcryptjs');
const CONFIG = require('config');
const JWT = require('jsonwebtoken');

/* 
    ROUTE:          POST api/users
    DESCRIPTION:    Register a new user
    ACCESS:         Public                                                                                                 */
    ROUTER.post('/', (request, response) => {
        let { name, username, email, password } = request.body;

        // Basic Validation (CHANGE LATER)
        if ( !name || !username || !email || !password ){
            return response
                            .status(400)
                            .json({ message: "Please fill out all fields"})
        }

        // Check for existing user
        USER
            .findOne({ email })
            .then( user => {
                // Assert if user exists and send response
                if( user ) return response.status(400).json({  message: "A user has already been registered under that email address"})
            
                // Create New User
                let newUser = new USER({
                    name,
                    username,
                    email,
                    password
                });
                // Hash the users password
                BCRYPT.genSalt( 12, (err, salt) => {
                    BCRYPT.hash( newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        
                        // assign the generated hash string to the password prop of new user
                        newUser.password = hash;
                        // save the user to database and send safe json response to client
                        newUser
                            .save()
                            .then( user => {
                                console.log("---------New User Added to DB---------");

                                // Sign the json web token for user
                                JWT.sign(
                                    { id: user.id },        // who is the token for (payload)
                                    CONFIG.get('jwtSecret'),// get secret through config
                                    { expiresIn: 3600 },
                                    ( err, token ) => {
                                        if(err) throw err;

                                        // send response to client
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
            });

    });
    
    
    module.exports = ROUTER;