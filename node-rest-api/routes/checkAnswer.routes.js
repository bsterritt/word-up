const express = require('express');
const app = express();

const checkAnswerRoute = express.Router();
let answers = require('../model/answers');

const PRESENT = "present";
const MATCHED = "matched";
const MISSING = "missing";

const getRandomAnswer = (answers) => {
    return answers[ Math.floor(Math.random() * answers.length) ];
}

const answer = "stuff";


const getMatchInfo = (testAnswer) => {
    // invalid test
    if(!testAnswer || testAnswer.length != answer.length) {
        return [];
    } 
    let matchInfo = [];
    const answerLetters = answer.split("");
    const testLetters = testAnswer.split("");
    return matchInfo = testLetters.map((testLetter,index) => {
        if (testLetter == answerLetters[index]) {
            return MATCHED;
        } else if (answerLetters.includes(testLetter)) {
            return PRESENT;
        } else {
            return MISSING;
        }
    });
}

checkAnswerRoute.route('/checkAnswer/:testAnswer').get((req,res) => {
    const matchInfo = getMatchInfo(req.params.testAnswer);
    console.log(`checkAnswerRoute test word : ${req.params.testAnswer}`,matchInfo);

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

module.exports =  checkAnswerRoute;