const mongoose = require('mongoose');


const answerStruc =  {
  0: { type: String, required: true },
  1: { type: String, required: true },
  2: { type: String, required: true },
  3: { type: String, required: true },
  4: { type: String, required: true },
}

const answerSchema = mongoose.Schema(answerStruc);

const Answer = mongoose.model("Answer",answerSchema);

/*
Answer.prototype.asString = () => {
    return [this['0'],this['1'],this['2'],this['3'],this['4']].join("");
} 
*/

module.exports = Answer;