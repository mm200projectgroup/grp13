const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const db = require('./dbconnect').db;
const prpSql = require('./dbconnect').prpSql;

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;


///TODO: Jobb med jwt.verify så den ikke gir error
router.post('/checkToken/', async function (req, res) {
    let token = req.body.token;
    console.log(token);
    let check;
    try{
        check = jwt.verify(token, secret);
    }
    catch (e) {
        console.log(e);
    }
    console.log(check);
    if(check){
        res.status(200).json({status:"OK"}).end();
    }
    else{
        res.status(403).json({status:"invalid"}).end();
    }
});


router.post("/login/", async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let check = await validateUser(username, password);
    console.log(check);
    if(check){
        let payload = {
            username: username
        };

        let tok;
        tok = jwt.sign(payload, secret, {
            expiresIn: "12h",
        });

        res.status(200).json({
            username: username,
            token: tok,
            userId: check.id,
            role: check.role
        });
    }
    else {
        res.status(401).json({
            mld: "Wrong username or password",
            status: "401"
        });

    }
});


async function validateUser (login, password){
    let hashQuery = prpSql.getHash;
    hashQuery.values = [login];
    try{
        let req = await db.one(hashQuery);
        let hash = req.hash;

        if(await bcrypt.compare(password, hash)){
            if(req.role === 2){
                return {
                    id:req.id,
                    role:2
                }
            }
            return {
                id: req.id,
                role: 1
            };
        }
    }
    catch (e) {
        console.log(e);
        return false;
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
                mld: "Username already exist"
            }).end();
        }else if (existingMail) {
            res.status(401).json({
                mld: "Email is already registered"
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