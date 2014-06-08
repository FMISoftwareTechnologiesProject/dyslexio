var fileName = 'words.txt';
var syllables;
var syllablesArray;
var words;
var wordsArray;
var usedWords = [];
var countUsedWords = [];
var countOfWords;
var markUsed = [];
var countLevels = 3;
var indexOfWord;
var level;

function shuffle(array) {
  var counter = array.length, temp, index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function init() {
  'use strict';
  var jsonData = JSON.parse($('#helpDiv').text());
  wordsArray = jsonData.words;
  countOfWords = jsonData.countOfWordsForEachLevel;
  syllablesArray = jsonData.syllables;
  var length = countOfWords * countLevels;
  while (length--) {
	usedWords.push(0);
	if (length < countLevels) {
	  countUsedWords.push(0);
	  markUsed.push(1);
	}
  }
}

function resetRound() {
  'use strict';
  shuffle(syllables);
  $('#syllablesHolder').empty();
  for (var i = 0; i < syllables.length; i += 1) {
    $('<span />',
      {text: syllables[i], class: 'draggable droppable'})
      .appendTo('#syllablesHolder');
  }
  $('.draggable').draggable({revert: true, revertDuration: 0});
  
  $('.droppable').droppable({
    hoverClass: 'drop-hover',
    drop: function (event, ui) {
      var oldSyllable = $(this).html();
      $(this).html(ui.draggable.html());
      ui.draggable.html(oldSyllable);
    }
  });
}

function startNewRound() {
  'use strict';
  words = wordsArray[indexOfWord];
  syllables = syllablesArray[indexOfWord];
  resetRound();
}

function chooseLevel(choosedLevel) {
  'use strict';
  level = choosedLevel;
  indexOfWord = getWordIndex(level);
  startNewRound();
}

function getWordIndex(level) {
  'use strict';
  if (countUsedWords[level] == countOfWords) {
	countUsedWords[level] = 0;
	markUsed[level] +=1;	
  }
  var index;
  while (true) {
	index = randomNumber(level  * countOfWords, (level + 1) * countOfWords - 1);
	if (usedWords[index] != markUsed[level]) {
	  usedWords[index] = markUsed[level];
	  countUsedWords[level] +=1;
	  break;
	}
  }
  return index;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function startNewGame() {
  'use strict';
  indexOfWord = getWordIndex(level);
  startNewRound();
}

function checkSolution() {
  'use strict';
  var spelledWord = $('#syllablesHolder').text();
  var correct = $.inArray(spelledWord, words) > -1; 
  if (correct) {
    alert('Поздравления! Решихте правилно задачата');
    startNewGame();
  } else {
    alert('Имате грешки в решението. Опитайте отново');
  }
}

$(function () {
  'use strict';
  $('#checkButton').click(checkSolution);
  $('#resetButton').click(resetRound);
  $('#newRoundButton').click(startNewGame);
  $('#helpDiv').load(fileName, init);
});

