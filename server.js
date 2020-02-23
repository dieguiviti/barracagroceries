const EXPRESS = require('express');
const MONGOOSE = require('mongoose');
const BODY_PARSER = require('body-parser');
const PATH = require('path');
const DOT_ENV = require('dotenv');

DOT_ENV.config();
const URI = process.env.MONGODB_URI;

// ITEMS api-route file reference ... see the USE ROUTES section of this file
const ITEMS = require('./routes/api/items');


// initialize EXPRESS
const app = EXPRESS();

// bodyParser middleware
app.use(BODY_PARSER.json());

// DB configuration
const DB = URI;

// Connect to mongoDB
MONGOOSE
    .connect(DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then( () => console.log('MongoDB is connected...' ) )
    .catch( error => console.log(error) );

// USE ROUTES
app.use('/api/items', ITEMS);
// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(EXPRESS.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(PATH.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Once connected to db, run the server:
// 1- Determine port
const PORT = process.env.PORT || 5000;
// 2- Listen
app.listen(PORT, () => console.log(`SERVER HAS STARTED AND IT IS LISTENING ON PORT: ${PORT}`));