const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const db = require('./dbconnect').db;
const prpSql = require('./dbconnect').prpSql;

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;




router.post("/login/", async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let check = await validateUser(username, password);
    if(check){
        let payload = {
            username: username
        };
        let tok = jwt.sign(payload, secret, {
            expiresIn: "12h"
        });

        res.status(200).json({
            username: username,
            token: tok,
            userId: check
        });
    }
    else {
        res.status(401).json({
            mld: "Feil brukernavn eller passord",
            status: "401"
        });

    }
});

//Validate user. Login kan være passord eller epost
async function validateUser (login, password){
    let hashQuery = prpSql.getHash;
    hashQuery.values = [login];
    let req = await db.one(hashQuery);
    let hash = req.hash;
    if(await bcrypt.compare(password, hash)){
        return req.id;
    }
}



router.post("/register/", async function (req, res) {
    let userEmail = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let hash = bcrypt.hashSync(password, 10);
    console.log(userEmail, username, hash);

    let queryCreateUser = prpSql.createUser;
    queryCreateUser.values = [userEmail, username, hash];

    let queryFindUser = prpSql.findUser;
    queryFindUser.values = [username, userEmail];



    try {
        let findUser = await db.any(queryFindUser);
        
        let existingUsr = findUser.find(existingUsr => {
            return username === existingUsr.username;
        });
        
        let existingMail = findUser.find(existingMail => {
            return userEmail === existingMail.email;
        });
 
        
        
       if (existingUsr) {
            res.status(401).json({
                mld: "Brukernavn allerede registrert"
            }).end();
        }else if (existingMail) {
            res.status(401).json({
                mld: "Epost allerede registrert"
            }).end();
        } else {
            let createUser = await db.any(queryCreateUser);
            let payload = {username: username};
            let tok = jwt.sign(payload, secret, {expiresIn: "12h"});
            res.status(200).json({
                username: username,
                userId: createUser.id,
                token: tok
            }).end();

            }



    } catch (err) {
        console.log(err);
        res.status(500).json({
            mld: err
        }).end(); //something went wrong!
    }

});



//export module -------------------------------------
module.exports = router;