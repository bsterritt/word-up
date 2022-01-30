const express = require('express');
var session = require('express-session');
const app = express();

const checkAnswerRoute = express.Router();
const words = require('../model/words');

const mongoose = require('mongoose');
const myDb = require('../database/db');

const getMatchInfo = require('../helpers/getMatchInfo');

checkAnswerRoute.route('/checkAnswer/:testAnswer').get((req,res) => {
    let answer = '';
    let testAnswer = req.params.testAnswer;
    console.log(`# checkAnswerRoute incoming > test word : ${testAnswer}`);
    
    mongoose.connect(`${myDb.storage}://${myDb.host}:${myDb.port}/${myDb.db}`).then(() => {
        console.log(`checkAnswerRoute connected to mongoDB`);
        if (req.session) {
            console.log(`checkAnswerRoute reached: session.answer incoming = ${req.session.answer}`);
            answer = req.session.answer;
            console.log(`checkAnswerRoute reached: saved answer is ${answer}`);
        } else {
            console.log(`checkAnswerRoute req.session does not exist !`);
        }


        let isWord = words.hasOwnProperty(testAnswer);

        console.log(` checkAnswerRoute ${testAnswer} is ${ isWord ? '' : 'NOT '}a word`);

        let matchInfo = new Array(5).fill("error");
        if (isWord == true) {
            console.log(` checkAnswerRoute ${testAnswer} getting macth info for valid Word, testing against  `);
            matchInfo = getMatchInfo(req.params.testAnswer, answer);
        }
        
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