///TODO: Kunne endre passord. Endre email.
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const prpSql = require('./dbconnect').prpSql;


router.post('/changeLogin/username', async function (request, res) {
    let newUsername = request.body.newUsr;
    let token = request.body.token;
    let username = checkToken(token);
    if(!username){return;}

    let findUserQuery = prpSql.findUser;
    findUserQuery.values = [newUsername, "none"];
    let taken = await db.any(findUserQuery);
    if(await taken.length !== 0){
        res.status(400);
        res.send(JSON.stringify({"error":"Username is taken.", "status":"400"})).end();
        return;
    }
//username blir ikke oppdatert når man endrer flere ganger
    let userQuery = prpSql.editUser;
    userQuery.values = [newUsername, username];
    console.log(userQuery);
    db.none(userQuery);
    let payload = {username: newUsername};
    let tok = jwt.sign(payload, secret, {expiresIn: "12h"});
    res.status(200);
    res.send(JSON.stringify({"message":"Username changed successfully","status":"200", "token": tok})).end();
});

router.post('/changeLogin/email', async function (request, res) {
    let newEmail = request.body.email;
    let token = request.body.token;
    let username = checkToken(token);
    if(!username){return;}
    
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
    let password = request.body.password;
    let token = request.body.token;
    let username = checkToken(token);
    if(!username){return;}
    let hash = bcrypt.hashSync(password);
   let passwordQuery = prpSql.editPassword;
   passwordQuery.values = [hash, username];
   console.log(passwordQuery);
   db.none(passwordQuery);
   res.status(200);
   res.send(JSON.stringify({"message":"Password changed successfully","status":"200"})).end();
});

function checkToken(token){
    let check;
    try{
        check = jwt.verify(token, secret);
    }
    catch (e) {
        res.status(400).json({
            "message":"Authentication failed",
            "status":400
        }).end();
        return false;
    }
    return jwt.decode(token).username;
}

router.delete("/changeLogin/:token", async function (req, res) {

    let token = req.params['token'];
    let username = checkToken(token);

    let deleteQuery = prpSql.deleteUser;
    deleteQuery.values = [username];
    db.none(deleteQuery);
    res.status(200).json({
        "message":"user deleted"
    }).end();
});

router.get("/hash/:username", async function (req, res) {
    let username = req.params["username"];
    let hashQuery = prpSql.getHash;
    hashQuery.values = [username];
    let hash = await db.one(hashQuery);
    res.status(200).json(hash).end();
});

module.exports = router;