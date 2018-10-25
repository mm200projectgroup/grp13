///TODO: Kunne endre passord. Endre email.
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');

router.update('/email/', async function (oldEmail, newEmail) {
    let query = `UPDATE public."users"
    SET email = '${newEmail}' WHERE username = '${oldEmail}`;

    try {
        db.none(query);
    } catch (err) {

    }
});