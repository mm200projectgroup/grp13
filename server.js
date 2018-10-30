const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = (process.env.PORT || 3000);


app.set('port', port);
app.use(express.static('public'));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); //go to the specified route
});


const users = require('./js/users.js');//router til users.js
app.use('/app/users/', users);


const editUsers = require('./js/editUsers.js');//router til editUsers.js
app.use('/app/editUsers/', editUsers);


app.listen(app.get('port'), function () {
    console.log('server running', app.get('port'));
});
