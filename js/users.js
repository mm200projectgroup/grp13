const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');



///TODO: Bedre login. Si ifra når passord er feil.
router.post("/login/", async function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let query = `SELECT *
	FROM public."users" WHERE username = '${username}'`;
    
    try {
        let datarows = await db.any(query);
        console.log(datarows);
        let nameMatch = datarows.length == 1 ? true : false;
        if (nameMatch == true) {
            let passwordMatch = bcrypt.compareSync(password, datarows[0].hash);
            if (passwordMatch == true) {
                res.status(200).json({
                    //mld: "Hallo, " + username,
                    username: username
                });
            }
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




///TODO: Endre på databasen slik at det brukerene har en bruker rolle. Må også sjekke om brukernavnet eksiterer. 
router.post("/register/", async function (req, res) {
    let userEmail = req.body.email;
    let userName = req.body.username;
    let password = req.body.password;
    let hashPassw = bcrypt.hashSync(password, 10);

    let query = `INSERT INTO public."users" ("id", "email", "username", "hash") VALUES (DEFAULT, '${userEmail}', '${userName}', '${hashPassw}') RETURNING "id", "email", "username", "hash"`;
    
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