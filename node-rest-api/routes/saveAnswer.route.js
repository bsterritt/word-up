const express = require('express');
var session = require('express-session');
const app = express();


const saveAnswerRoute = express.Router();

const mongoose = require('mongoose');
const myDb = require('../database/db');


let answers = require('../model/answers');

const getRandomAnswer = (answers) => {
    return answers[ Math.floor(Math.random() * answers.length) ];
}

const checkSession = (req) =>  {
    if (req.session) {
        console.log(`saveAnswerRoute reached: session.answer incoming = ${req.session.answer}`);
        req.session.answer = getRandomAnswer(answers);
        console.log(`saveAnswerRoute reached: session.answer outgoing = ${req.session.answer}`);
    } else {
        console.log(`saveAnswerRoute reached: req.session does not exist !`);
    }
}

saveAnswerRoute.route('/saveAnswer').get((req,res) => {
    
    console.log(`# saveAnswerRoute Incoming`);

    mongoose.connect(`${myDb.storage}://${myDb.host}:${myDb.port}/${myDb.db}`).then(() => {
        console.log(`saveAnswerRoute connected to mongoDB`);
        checkSession(req);
        
        res.status(200).json({
            status: "SUCCESS"
        });
    });

});

module.exports =  saveAnswerRoute;