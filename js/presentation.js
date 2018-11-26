const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');
const prpSql = require('./dbconnect').prpSql;

const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
let logindata;



router.use(function (req, res, next) {

   
    let token = req.body.token;
    if (!token) {
        res.status(403).json({
            msg: "No token received"
        }); //send
        console.log("no token recived");
        return; //quit
    } else {
        try {
            logindata = jwt.verify(token, secret); //check the token
        } catch (err) {
            res.status(403).json({
                msg: "The token is not valid!"
            });
            console.log("he token is not valid!");
            return;
        }
    }

    next(); //we have a valid token - go to the requested endpoint
});

router.post('/savePresentation', async function (req, res) {

    let title = req.body.presentationTitle;
    let presentation = req.body.presentationData;
    let userId = req.body.userId.toString();
    userId = userId + ",";
    let presID;
    if (req.body.presId) {
        presID = req.body.presId;
    }
    console.log(presID);
    try {
        if(presID){
            let updatePresentationQuery = prpSql.updatePresentation;
            updatePresentationQuery.values = [title, presentation, presID];
            console.log(updatePresentationQuery);
            let updated = await db.any(updatePresentationQuery);

            res.status(200).json({
                pres: updated
            }).end();
        }
        else {
            let savePresentationQuery = prpSql.newPresentation;
            savePresentationQuery.values = [title, presentation, userId];

            let newPres = await db.any(savePresentationQuery);

            res.status(200).json({
                presId: newPres[0].presentationid
            }).end();
        }
    } catch (err) {
        res.status(500).json({
            error: err
        }).end();
    }


});


router.post('/listOutPresentations' , async function (req, res){
    let UserId = req.body.userId.toString();
    UserId = UserId + ",";
    let getPresentations = `SELECT * FROM public."presentation" WHERE "ownerid" LIKE '%${UserId}%'`;
    
    try{
       let getAll = await db.any(getPresentations);
        

        
        res.status(200).json({
             loadPres: getAll
            }).end();
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

router.post('/sharePresentation', async function (req, res) {
    try {
        let login = req.body.login;
        let presentation = req.body.presID;
        console.log(login, presentation);

        let getID = prpSql.getHash;
        getID.values = [login];
        let info = await db.one(getID);
        let userID = info.id.toString();
        userID = userID + ",";
        console.log(userID, typeof userID);
        let shareQuery = prpSql.sharePresentation;
        shareQuery.values = [userID, presentation];
        db.none(shareQuery);
        
        res.status(200).json({
             feedback: "Success!"
            }).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

router.post('/makePublic', async function (req, res) {
    try {
        let userID = req.body.userID.toString();
        let presID = req.body.presID;
        userID = userID + ",";
        let getPresentations = `SELECT * FROM public."presentation" WHERE "ownerid" LIKE '%${userID}%'`;

        let presentations = await db.any(getPresentations);
        
        let check = false;
        presentations.forEach(function (element) {
            if (element.presentationid == presID) {
                check = true;
            }
        });
        
    
        
        if (check) {
            let publicQuery = prpSql.makePublic;
            publicQuery.values = [parseInt(presID)];
            db.none(publicQuery);
            
            res.status(200).json({
             feedback: "Presentation is now public"
            }).end();
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            feedback: "Server error"
        }).end();
    }
});

router.post('/deletePresentation', async function (req, res) {
    let presID = req.body.presID;
    let userID = req.body.userID;

    let getPresentation = `SELECT * FROM public."presentation" WHERE "presentationid" = ${presID}`;
    let presentation  = await db.one(getPresentation);
    let check = false;
    if(presentation.ownerid === 'public'){
        let user = await db.one(`SELECT role FROM public."users" WHERE "id" = ${userID}`);
        console.log(user);
        if(user.role !== 2){
            res.status(401).json({
                feedback: "Acess denied"
            }).end();
            return;
        }
        check = true;
    }
    else{
        let owners = presentation.ownerid.split(",");
        owners.forEach(function (element) {
            if (element == userID) {
                check = true;
            }
        });

    }
    console.log(check);
    if(check === true){
        let deleteQuery = prpSql.deletePresentation;
        deleteQuery.values = presID;
        db.none(deleteQuery);
        res.status(200).json({
            feedback: "Presentation deleted"
        }).end();
    }

});


router.post('/listPublic', async function (req, res) {
    try{
        let getPublicRequest = prpSql.getPublic;
        let presList = await db.any(getPublicRequest);
        
        res.status(200).json({
             loadPublicPres: presList
            }).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).end();
    }
});


module.exports = router;