const express = require('express');
var session = require('express-session');
const app = express();

const checkAnswerRoute = express.Router();
let answers = require('../model/answers');

const PRESENT = "present";
const MATCHED = "matched";
const MISSING = "missing";

const mongoose = require('mongoose');
const myDb = require('../database/db');

const getRandomAnswer = (answers) => {
    return answers[ Math.floor(Math.random() * answers.length) ];
}

const getMatchInfo = require('../helpers/getMatchInfo');


checkAnswerRoute.route('/checkAnswer/:testAnswer').get((req,res) => {
    let answer = '';
    console.log(`# checkAnswerRoute incoming > test word : ${req.params.testAnswer}`);
    mongoose.connect(`${myDb.storage}://${myDb.host}:${myDb.port}/${myDb.db}`).then(() => {
        console.log(`checkAnswerRoute connected to mongoDB`);
        if (req.session) {
            console.log(`checkAnswerRoute reached: session.answer incoming = ${req.session.answer}`);
            if (!req.session.answer) {
                answer = getRandomAnswer(answers);
            } else {
                answer = req.session.answer;
            }
            console.log(`checkAnswerRoute reached: saved answer is ${answer}`);
        } else {
            console.log(`checkAnswerRoute req.session does not exist !`);
        }
    
        const matchInfo = getMatchInfo(req.params.testAnswer, answer);
    
        if (matchInfo != null) {
            res.status(200).json({
                status : "SUCCESS",
                answer: req.params.testAnswer,
                message: "Successful Answer Test",
                matchInfo: matchInfo
            });
        } else {
            res.status(500).json({
                status : "ERROR",
                answer: req.params.testAnswer,
                message: "Invalid Test Answer",
                matchInfo: matchInfo
            });        
        }
    });




});

module.exports =  checkAnswerRoute;