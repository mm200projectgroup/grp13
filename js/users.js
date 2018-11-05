const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const db = require('./dbconnect').db;
const prpSql = require('./dbconnect').prpSql;

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;



///TODO: Bedre login. Si ifra når passord er feil.
router.post("/login/", async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let query = prpSql.findUser;
    query.values = [username];

    try {

        let datarows = await db.any(query);
        if (datarows.length == 0) {
            res.status(401).json({
                mld: "Feil brukernavn eller passord"
            });
        }

        let passwordMatch = bcrypt.compareSync(password, datarows[0].hash);
        let nameCheck = datarows.find(nameCheck => {
            return username === nameCheck.username;
        });


        if (nameCheck && passwordMatch) {
        let payload = {username: nameCheck.username};
        let tok = jwt.sign(payload, secret, {expiresIn: "12h"});

            res.status(200).json({
                username: username,
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




///TODO: Endre på databasen slik at det brukerene har en bruker rolle. Brukeren må også få beskjed hvis epost eller brukernavn allerede er registrert
router.post("/register/", async function (req, res) {
    let userEmail = req.body.email;
    let userName = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    let hashPassw = bcrypt.hashSync(password, 10);

    let query = prpSql.createUser;
    query.values = [userEmail, userName, hashPassw, role];
    


    try {
        let code = db.any(query) ? 200 : 500;
        res.status(code).json({}).end()

    } catch (err) {
        res.status(500).json({
            error: err
        }); //something went wrong!     
    }

});



/*
//Test for å se om getData funker
router.get("/getUsers/", async function (req, res){
    let query = 'SELECT * FROM public."users"';
    
    
    try{
    let users = await db.any(query);
    console.log(users);
    res.status(200).json(users);
        
    }catch (err) {
        res.status(500).json({
            error: err
        }); //something went wrong!
    }

    
});

*/

//export module -------------------------------------
module.exports = router;