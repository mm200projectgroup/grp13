const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');
const prpSql = require('./dbconnect').prpSql;

let jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
let logindata;



router.use(function (req, res, next) {

   
    let token = req.body.token;
    console.log(token)
    if (!token) {
        res.status(403).json({
            msg: "No token received"
        }); //send
        console.log("no token recived")
        return; //quit
    } else {
        try {
            logindata = jwt.verify(token, secret); //check the token
        } catch (err) {
            res.status(403).json({
                msg: "The token is not valid!"
            }); //send
            console.log("he token is not valid!")
            return; //quit
        }
    }

    next(); //we have a valid token - go to the requested endpoint
});


router.post('/savePresentation', async function (req, res){
    
    let title = req.body.presentationTitle;
    let presentation = req.body.presentationData;
    let userId = req.body.userId;
    
    let savePresentationQuery = prpSql.newPresentation;
    savePresentationQuery.values = [title, presentation, userId];
    
    try{
       let newPres = await db.any(savePresentationQuery);

        
        res.status(200).json({
                presId: newPres[0].presentationid
            }).end();
        
        
        

    } catch(err){
        res.status(500).json({
            error: err
        });
    }
    


});



router.post('/updatePresentation', async function (req, res){
    
    let title = req.body.presentationTitle;
    let presentation = req.body.presentationData;
    let userId = req.body.userId;
    let presId = req.body.presId
    
    let updatePresentationQuery = prpSql.updatePresentation;
    updatePresentationQuery.values = [title, presentation, presId];

    
    try{
      let updated = await db.any(updatePresentationQuery);

        res.status(200).json({
                pres: updated
            }).end();
        

    } catch(err){
        res.status(500).json({
            error: err
        });
    }
    

});



module.exports = router;