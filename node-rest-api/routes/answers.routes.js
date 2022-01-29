const express = require('express');
const app = express();

const answersRoute = express.Router();
let answers = require('../model/answers');

answersRoute.route('/answers').get((req,res) => {
    res.status(200).json({
        answers: answers
    })
});

module.exports =  answersRoute;