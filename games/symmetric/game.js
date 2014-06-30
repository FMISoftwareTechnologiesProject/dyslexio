var fileName = 'imgs.txt';
var imgss;
var imgsArray;
var usedImgs = [];
var countUsedImgs = [];
var countOfimgs;
var markUsed = [];
var countLevels = 3;
var currentLevel = 0;
var indexOfimg;
var level;

function randomNumber(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getimgIndex(level) {
  'use strict';
  if (countUsedImgs[level] === countOfimgs) {
    countUsedImgs[level] = 0;
    markUsed[level] += 1;
  }
  var index;
  while (true) {
    index = randomNumber(level  * countOfimgs, (level + 1) * countOfimgs - 1);
    if (usedImgs[index] !== markUsed[level]) {
      usedImgs[index] = markUsed[level];
      countUsedImgs[level] += 1;
      break;
    }
  }
  return index;
}

function resetRound() {
  'use strict';
  $('#sentenceHolder').empty();
  $('#sentenceHolder').html(imgss);

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
  imgss = '<img src='+imgsArray[indexOfimg][1]+'>'+'<span id="p" class="droppable">&nbsp;</span>'; 
  $('#punctuationHolder').empty();
  var len = level + 4;
  for (var i = 2; i < len; i += 1) {
    $('<span class="draggable"><img id="t" src='+imgsArray[indexOfimg][i]+'>'+'</span>')
      .appendTo('#punctuationHolder');
  }
  $('.draggable').draggable({revert: true, revertDuration: 0});
  resetRound();
}

function chooseLevel(choosedLevel) {
  'use strict';
  level = Dyslexio.getLevel('symmetric');
  indexOfimg = getimgIndex(level);
  startNewRound();
}

function init() {
  'use strict';
  var jsonData = JSON.parse($('#helpDiv').text());
  imgsArray = jsonData.imgs;
  countOfimgs = jsonData.countOfImgsForEachLevel;
  var length = countOfimgs * countLevels;
  while (length) {
    length -= 1;
    usedImgs.push(0);
    if (length < countLevels) {
      countUsedImgs.push(0);
      markUsed.push(1);
    }
  }
  chooseLevel(currentLevel);
}

function startNewGame() {
  'use strict';
  indexOfimg = getimgIndex(level);
  startNewRound();
}

function checkSolution() {
  'use strict';
  var correct = '\"'+$('#t').attr('src')+'\"' === imgsArray[indexOfimg][0];
  if (correct) {
    alert('Поздравления! Решихте правилно задачата');
    Dyslexio.correctSolution('symmetric');
    currentLevel = Dyslexio.getLevel('symmetric');
    chooseLevel(currentLevel);
    } else {
     alert('Имате грешки в решението. Опитайте отново');
     Dyslexio.incorrectSolution('symmetric');
    }
}

function initGame() {
  'use strict';
  $('#checkButton').click(checkSolution);
  $('#resetButton').click(resetRound);
  $('#newRoundButton').click(startNewGame);
  $('#helpDiv').load(fileName, init);
}

