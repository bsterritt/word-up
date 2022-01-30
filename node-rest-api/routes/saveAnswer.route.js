const express = require('express');
var session = require('express-session');
const app = express();


const saveAnswerRoute = express.Router();

const mongoose = require('mongoose');
const myDb = require('../database/db');


let answers = require('../model/answers');
const Answer = require('../model/answer');

const getRandomAnswer = (aList) => {
    return aList[ Math.floor(Math.random() * aList.length) ];
}

const checkSession = (req,a) =>  {
    if (req.session) {
        console.log(`saveAnswerRoute reached: session.answer incoming = ${req.session.answer}`);
        req.session.answer = a;
        console.log(`saveAnswerRoute reached: session.answer outgoing = ${req.session.answer}`);
    } else {
        console.log(`saveAnswerRoute reached: req.session does not exist !`);
    }
}

saveAnswerRoute.route('/saveAnswer').get((req,res) => {
    
    console.log(`# saveAnswerRoute Incoming`);

    mongoose.connect(`${myDb.storage}://${myDb.host}:${myDb.port}/${myDb.db}`,(err,_db) => {
        console.log(`saveAnswerRoute connected to mongoDB`);
        Answer.find((err,_answers) => {
            console.log('found answers collection in DB, length',_answers.length);
            const randomAnswerDoc = getRandomAnswer(_answers);
            console.log('random answer chosen',randomAnswerDoc);
            
            const randomAnswer =  [
                randomAnswerDoc['0'],
                randomAnswerDoc['1'],
                randomAnswerDoc['2'],
                randomAnswerDoc['3'],
                randomAnswerDoc['4']
            ].join("");

            console.log('random answerstring',randomAnswer);

            checkSession(req,randomAnswer);
        
            res.status(200).json({
                status: "SUCCESS"
            });
        });

        /*
        let db = mongoose.connection;
        db.collections('answers').find().toArray((err,_answers) => {
            console.log('found answers collection in DB',_answers.length);
            checkSession(req,getRandomAnswer(_answers));
        
            res.status(200).json({
                status: "SUCCESS"
            });
        });
        */

    });

});

module.exports =  saveAnswerRoute;