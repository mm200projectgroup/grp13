///TODO: Kunne endre passord. Endre email.
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');

router.post('/email/', function (request) {
    console.log(request);
    let newEmail = request.newEmail;
    let oldEmail = request.oldEmail;
    let query = `UPDATE public."users"
    SET email = '${newEmail}' WHERE username = '${oldEmail}`;

    try {
        db.none(query);
        console.log(`old email: ${oldEmail}. New email: ${newEmail}`);
    } catch (err) {
        console.log(err)
    }
});
module.exports = router;