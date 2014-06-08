var sentence = 'Сложи#запетая тук#и точка тук#';
var game = 0;
var c = 0;
var limit = 1;
var texts = ['text1.txt', 'text2.txt'];
var punctSymbols = [',', '.', '?'];
var correctSentences = ['Сложи запетая тук, и точка тук.', 'Сложи точка тук.'];

function resetRound() {
  'use strict';
  $('#sentenceHolder').empty();
  var sentenceDivHtml = sentence.replace(/#/g, '<span class="droppable">&nbsp;</span>');
  $('#sentenceHolder').html(sentenceDivHtml);
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
  sentence = $('#helpDiv').text();
  $('#punctuationHolder').empty();
  for (var i = 0; i < punctSymbols.length; i += 1) {
    $('<span />',
      {text: punctSymbols[i], class: 'draggable'})
      .appendTo('#punctuationHolder');
  }
  $('.draggable').draggable({revert: true});
  resetRound();
}

function loadText() {
  'use strict';
  $('#helpDiv').load(texts[game], startNewRound);
  c = game;
  if (game === limit) {
    game = 0;
  } else {
    game += 1;
  }
}

function startNewGame() {
  'use strict';
  loadText();
}

function checkSolution() {
  'use strict';
  var correct = $('#sentenceHolder').text()
      .replace(/\u00a0/g, ' ')
      .trim() === correctSentences[c];
  if (correct) {
    alert('Поздравления! Решихте правилно задачата');
    loadText();
  } else {
    alert('Имате грешки в решението. Опитайте отново');
  }
}

$(function () {
  'use strict';
  $('#checkButton').click(checkSolution);
  $('#resetButton').click(resetRound);
  $('#newRoundButton').click(startNewGame);
  startNewGame();
});

