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

    let query = prpSql.findUser;
    query.values = [username, username];

    try {

        let datarows = await db.any(query);
        if (datarows.length === 0) {
            res.status(401).json({
                mld: "Feil brukernavn eller passord"
            });
        }

        let passwordMatch = bcrypt.compareSync(password, datarows[0].hash);
        let nameCheck = datarows.find(nameCheck => {
            return username === nameCheck.username || username ===nameCheck.email;
        });

        
        if (nameCheck && passwordMatch) {
            let payload = {
                username: nameCheck.username
            };
            let tok = jwt.sign(payload, secret, {
                expiresIn: "12h"
            });

            res.status(200).json({
                username: nameCheck.username,
                token: tok
            });

        } else {
            res.status(401).json({
                mld: "Feil brukernavn eller passord"
            });

        }

    } catch (err) {
        res.status(500).json({
            error: err
        }); //something went wrong!
    }


});





router.post("/register/", async function (req, res) {
    let userEmail = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    let queryCreateUser = prpSql.createUser;
    queryCreateUser.values = [userEmail, username, password, role];

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
                token: tok
            });

            }



    } catch (err) {
        res.status(500).json({
            error: err
        }); //something went wrong!     
    }

});



//export module -------------------------------------
module.exports = router;