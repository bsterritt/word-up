const express = require('express');
const app = express();

const words = require('../model/words');

const wordCheckRoute = express.Router();

wordCheckRoute.route('/checkWord/:word').get((req,res) => {
    console.log(`# checkWordRoute incoming > test word : ${req.params.word}`);
    let doesMatch = words.hasOwnProperty(req.params.word);
    console.log(`# checkWordRoute ${req.params.word} is ${ doesMatch ? 'NOT' : ''} a word`);



    res.status(200).json({
        status : "SUCCESS",
        word: req.params.word,
        message: "Successful Word Check",
        isWord: doesMatch
    });    
});

module.exports = wordCheckRoute;