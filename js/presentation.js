const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbconnect').db; //database
const bcrypt = require('bcryptjs');
const prpSql = require('./dbconnect').prpSql;


router.post('/savePresentation', async function (req, res){
    
    let title = req.body.presentationTitle;
    let presentation = req.body.presentationData;
    
    let savePresentationQuery = prpSql.newPresentation;
    savePresentationQuery.values = [title, presentation];
    
    try{
        db.any(savePresentationQuery);
        console.log(savePresentationQuery);
        
        

    } catch(err){
        res.status(500).json({
            error: err
        });
    }
    


});





module.exports = router;