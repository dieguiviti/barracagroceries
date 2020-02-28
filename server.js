const EXPRESS = require('express');
const MONGOOSE = require('mongoose');
const PATH = require('path');
const CONFIG = require('config');

// initialize EXPRESS App
const APP = EXPRESS();

//  Use the json content type through express' bodyparser
APP.use(EXPRESS.json());

// API ROUTES SET UP
const ITEMS = require('./routes/api/items');
const USERS = require('./routes/api/users');
const AUTH  = require('./routes/api/auth');
APP.use('/api/items', ITEMS);
APP.use('/api/users', USERS);
APP.use('/api/auth', AUTH);

// DB configuration
const URI = CONFIG.get('MONGODB_URI');
const DB = URI;

// Connect to DB (Mongo DB)
MONGOOSE
    .connect(DB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then( () => console.log('MongoDB is connected...') )
    .catch( error => console.log(error) );

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    APP.use(EXPRESS.static('client/build'));

    APP.get('*', (req, res) => {
        res.sendFile(PATH.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Once connected to DB, run the server for local development:
// 1- Determine port
const PORT = process.env.PORT || 5000;
// 2- Listen
APP.listen(PORT, () => console.log(`SERVER HAS STARTED AND IT IS LISTENING ON PORT: ${PORT}`));