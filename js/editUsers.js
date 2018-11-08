///TODO: Kunne endre passord. Endre email.
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');
const prpSql = require('./dbconnect').prpSql;


router.post('/changeLogin/username', async function (request, res) {
    let newUsername = request.body.newUsr;
    let username = request.body.username;
    let userQuery = prpSql.editUser;

    let findUserQuery = prpSql.findUser;
    findUserQuery.values = [newUsername, "none"];
    let taken = await db.any(findUserQuery);
    console.log(await taken, newUsername, username,);
    if(await taken.length !== 0){
        res.status(400);
        res.send(JSON.stringify({"error":"Username is taken.", "status":"400"})).end();
        return;
    }

    userQuery.values = [newUsername, username];
    db.none(userQuery);
    res.status(200);
    res.send(JSON.stringify({"message":"Username changed successfully","status":"200"})).end();
});

router.post('/changeLogin/email', async function (request, res) {
    let newEmail = request.body.email;
    let username = request.body.username;
    
    let findUserQuery = prpSql.findUser;
    findUserQuery.values = ["none", newEmail];
    let taken = await db.any(findUserQuery);
    
    if(await taken.length !== 0){
        res.status(400);
        res.send(JSON.stringify({"error":"Email is already taken", "status":"400"})).end();
        return;
    }

    let emailQuery = prpSql.editEmail;
    emailQuery.values = [newEmail, username];
    db.none(emailQuery);
    res.status(200);
    res.send(JSON.stringify({"message":"Email changed successfully", "status":"200"})).end();

});

router.post('/changeLogin/password', async function (request, res) {
   let hash = request.body.password;
   let username = request.body.username;

   let passwordQuery = prpSql.editPassword;
   passwordQuery.values = [hash, username];
   db.none(passwordQuery);
   res.status(200);
   res.send(JSON.stringify({"message":"Password changed successfully","status":"200"})).end();
});

function handleError(e) {
    console.log(e);
}

async function checkEmailAvailable(email) {
    let query = prpSql.findUser;
    query.values = [null, email];

    let results = await db.any(query);
    return results.length === 0;
}


router.delete("/changeLogin/", async function (req, res) {


});


module.exports = router;