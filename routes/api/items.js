const EXPRESS = require('express');
const ROUTER  = EXPRESS.Router();

// Item Model
const ITEM = require('../../models/Item');

/* 
    ROUTE:          GET api/item
    DESCRIPTION:    Get all items
    ACCESS:         Public                                                                                                 */
ROUTER.get('/', (request, response) => {
    ITEM                                        // refer to the model ITEM 
        .find()                                 // find the 'items' that correspond to the model
        .sort( {date: -1} )                     // sort the 'items' by date in descending order (1 would be ascending order)
        .then( items => response.json(items) )  // after finding and sorting 'items', add them to response in json format 
});

/* 
    ROUTE:          POST api/item
    DESCRIPTION:    Create and post an item to the database
    ACCESS:         Public                                                                                                  */
ROUTER.post('/', (request, response) => {
        const NEW_ITEM = new ITEM({                 // Create a new item object (see line 5)
        name: request.body.name                     // The name of the request will come from the body 
    });

        NEW_ITEM
            .save()                                 // Save the new item
            .then( item => response.json(item) );   // after saving it, let's send a json response
    });


/* 
    ROUTE:          DELETE api/item/:id
    DESCRIPTION:    Delete an item from the database
    ACCESS:         Public
*/

ROUTER.delete('/:id', (request, response) => {
    ITEM
        .findById( request.params.id )                                         // Find item by Id using the req.params object
        .then( item => {                                                       // Then, grab the item,
            item 
                .remove()                                                      // remove it from database
                .then( () => response.json({ success: true }) )                // then return a json response {success: true}
        })
        .catch( error => response.status(404).json({success: false}) );        // if you catch an error in the request send response status 404 id not found

});


module.exports = ROUTER;