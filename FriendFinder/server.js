// dependencies...
    const express = require('express');
    const path = require('path');

// initialize app...
    const app = express();
    // set port base on heroku or default to 3000...
        let PORT = process.env.PORT || 3000;

// Set up body parsing and static middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));


    require('./app/routing/apiRoutes')(app);
    require('./app/routing/htmlRoutes')(app);

// start server...
    app.listen(PORT, function(){
        console.log(`Listening on port: ${PORT}`);
    });