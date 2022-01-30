const PRESENT = "present";
const MATCHED = "matched";
const MISSING = "missing";

const getMatchInfo = (testAnswer, answer) => {
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

module.exports = getMatchInfo;