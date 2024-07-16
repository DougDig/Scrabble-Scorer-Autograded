// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

function testWordIsLetters(word) {
   let validArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
   let wordArray = word.split('');

   for (let i=0; i<word.length; i++) {
      if (!validArray.includes(wordArray[i])) {
         return false
      }
   }
   return true
}

function testInputIs012 (num) {
   if ((num === '0') || (num === '1') || (num === '2')){
      return true;
   }
   return false;
}


function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let inputWord = input.question("What's a word you want scored?:  ");
   inputWord = inputWord.toLowerCase();
   while (!testWordIsLetters(inputWord)) {
      inputWord = input.question("Invalid Character Detected, enter another word:  ");
      inputWord = inputWord.toLowerCase();   
   }
   return inputWord;
};


let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;


let simpleScorer = function(inputWord) {
return inputWord.length;
}

let vowelBonusScorer = function (inputWord) {
   let score = 0;
   let vowels = ['A','E','I','O','U','Y','a','e','i','o','u','y'];
      for (let i=0; i<inputWord.length; i++) {
         if (vowels.includes(inputWord[i])) {
            score = score + 3;
         } else {
            score++;
         }
   }
   return score;
};

let scrabbleScorer = function(word){
   let score = 0
   for (let i=0; i<word.length; i++) {
      score = score + newPointStructure[word[i]];
   }
return score;
};

let simple = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer,
};
let vowel = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer,
};
let old = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer,
};
const scoringAlgorithms = [simple, vowel, old];

function scorerPrompt() {
   console.log("You can score three different ways Simple[0], Bonuses for Vowels[1], and Normal Scrabble Rules[2]:");
   let inputNumber = input.question("Enter 0, 1, or 2:  ");
   while (!testInputIs012(inputNumber)) {
      inputNumber = input.question("Invalid Character Please enter 0, 1, or 2:  ");
   }
   return scoringAlgorithms[inputNumber].scorerFunction;
}

function transform(scoreObject) {
   //let tempObject = {' ': 0};
   let tempObject = {};
   for (pointValue in scoreObject) {
      let letters =  scoreObject[pointValue];
      for (let i=0; i<letters.length; i++){
         let character = letters[i];
         character = character.toLowerCase();
         tempObject[character] = Number(pointValue);
      }
   }
   return tempObject;
};

function runProgram() {
   let judgedWord = initialPrompt();
   let scoringFunction = scorerPrompt();
   console.log(scoringFunction(judgedWord));
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};