var fileName = 'texts.txt';
var punctSymbols = [',', '.', '?',';','!'];
var text;
var textsArray;
var usedTexts = [];
var countUsedTexts = [];
var countOfTexts;
var markUsed = [];
var countLevels = 3;
var currentLevel = 0;
var correctSolutions = 0;
var levelThreshold = 3;
var indexOfText;
var level;

function init() {
  'use strict';
  var jsonData = JSON.parse($('#helpDiv').text());
  textsArray = jsonData.texts;
  countOfTexts = jsonData.countOfTextsForEachLevel;
  var length = countOfTexts * countLevels;
  while (length--) {
	usedTexts.push(0);
	if (length < countLevels) {
	  countUsedTexts.push(0);
	  markUsed.push(1);
	}
  }
  chooseLevel(currentLevel);
}

function resetRound() {
  'use strict';
  $('#sentenceHolder').empty();
  $('#sentenceHolder').html(text);
  
  $('.droppable').droppable({
    hoverClass: 'drop-hover',
    tolerance: 'touch',
    drop: function (event, ui) {
      $(this).html(ui.draggable.html() + '&nbsp;');
    }
  });
}

function startNewRound() {
  'use strict';
  text = textsArray[indexOfText].replace(/\./g, '<span class="droppable">&nbsp;</span>')
         .replace(/,/g, '<span class="droppable">&nbsp;</span>')
         .replace(/\?/g, '<span class="droppable">&nbsp;</span>')
		 .replace(/\!/g, '<span class="droppable">&nbsp;</span>')
		 .replace(/\;/g, '<span class="droppable">&nbsp;</span>');
  $('#punctuationHolder').empty();
  var len = punctSymbols.length + level - 2;
  for (var i = 0; i < len; i += 1) {
    $('<span />',
      {text: punctSymbols[i], class: 'draggable'})
      .appendTo('#punctuationHolder');
  }
  $('.draggable').draggable({revert: true, revertDuration: 0});
  resetRound();
}

function chooseLevel(choosedLevel) {
  'use strict';
  level = choosedLevel;
  indexOfText = getTextIndex(level);
  startNewRound();
}

function getTextIndex(level) {
  'use strict';
  if (countUsedTexts[level] == countOfTexts) {
	countUsedTexts[level] = 0;
	markUsed[level] +=1;	
  }
  var index;
  while (true) {
	index = randomNumber(level  * countOfTexts, (level + 1) * countOfTexts - 1);
	if (usedTexts[index] != markUsed[level]) {
	  usedTexts[index] = markUsed[level];
	  countUsedTexts[level] +=1;
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
  indexOfText = getTextIndex(level);
  startNewRound();
}

function checkSolution() {
  'use strict';
  var correct = $('#sentenceHolder').text()
	  .replace(/\u00a0/g,' ')
	  .trim() === textsArray[indexOfText]; 
  if (correct) {
    alert('Поздравления! Решихте правилно задачата');
    correctSolutions++;
    if (correctSolutions >= levelThreshold) {
      correctSolutions = 0;
      currentLevel++;
      if (currentLevel >= countLevels) {
        currentLevel = countLevels - 1;
      }
      chooseLevel(currentLevel);
    } else {
      startNewGame();
    }
  } else {
    alert('Имате грешки в решението. Опитайте отново');
    correctSolutions = 0;
  }
}

$(function () {
  'use strict';
  $('#checkButton').click(checkSolution);
  $('#resetButton').click(resetRound);
  $('#newRoundButton').click(startNewGame);
  $('#helpDiv').load(fileName, init);
});

