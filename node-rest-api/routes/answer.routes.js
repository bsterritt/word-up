const express = require('express');
const app = express();

const answerRoute = express.Router();
let answers = require('../model/answers');

const getRandomAnswer = (answers) => {
    return answers[ Math.floor(Math.random() * answers.length) ];
}

answerRoute.route('/answer').get((req,res) => {
    res.status(200).json({
        answer: getRandomAnswer(answers)
    });
});

module.exports =  answerRoute;