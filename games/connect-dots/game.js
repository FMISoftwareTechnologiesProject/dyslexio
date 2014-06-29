var fileName = 'drawings.txt';
var drawing;
var drawingsArray;
var usedDrawings = [];
var countUsedDrawings = [];
var countOfDrawings;
var markUsed = [];
var indexOfDrawing;
var countLevels = 3;

var patternX = 10;
var patternY = 140;
var drawX = 500;
var drawY = 140;
var gridRows;
var gridCols;
var maxRows = 12;
var maxCols = 12;
var canvasPatern;
var patternColor = 'red';
var canvasDraw;
var drawColor = 'blue';
var circleRadius = 10;
var circleSpace = 20;
var solution;

function initCanvases() {
  'use strict';
  var width = maxCols * circleRadius * 2 + (maxCols + 1) * circleSpace;
  var height = maxRows * circleRadius * 2 + (maxRows + 1) * circleSpace;
  canvasPatern = Raphael(patternX, patternY, width, height);
  canvasDraw = Raphael(drawX, drawY, width, height);
}

function drawGrid(canvas, rows, cols, color, addDrag) {
  'use strict';
  var x = circleSpace;
  var y = circleSpace;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var circle = canvas.circle(x + circleRadius, y + circleRadius, circleRadius);
      circle.attr('fill', color);
      circle.attr('stroke', color);
      x += circleSpace + circleRadius * 2;
          
      if (!addDrag) {
        continue;
      }
      circle.drag(
        function(dx, dy, x, y) {
          if (this.line) {
            this.line.remove();
          }
          this.line = canvas.path(['M', this.startX, this.startY, 'l', dx, dy]);
          this.line.attr('stroke', color);              
        },
        function(x, y, event) {
          this.startX = this.attrs.cx;
          this.startY = this.attrs.cy;
        },
        function(event) {
          if (this.line) {
            this.line.remove();
          }

          if (!(event.toElement instanceof SVGCircleElement)) {
            return;
          }
          
          var from = getPostionFromCoordinates(this.startX, this.startY);
          var to = getPostionFromCoordinates(event.x - drawX , event.y - drawY)
          if (from.row === to.row && from.col === to.col) {
            return;
          }

          drawLine(canvasDraw, from.row, from.col, to.row, to.col, drawColor);
          addToSolution(from, to);
        }
      );
  
    }

    x = circleSpace;
    y += circleSpace + circleRadius * 2;
  }
}

function drawLine(canvas, fromRow, fromCol, toRow, toCol, color) {
  'use strict';
  var fromX = fromCol * 2 * circleRadius + fromCol * circleSpace - circleRadius;
  var toX = toCol * 2 * circleRadius + toCol * circleSpace - circleRadius;
  var fromY = fromRow * 2 * circleRadius + fromRow * circleSpace - circleRadius;
  var toY = toRow * 2 * circleRadius + toRow * circleSpace - circleRadius;

  var line = canvas.path(["M", fromX, fromY, "l", toX - fromX, toY - fromY]);
  line.attr("stroke", color);
}

function drawPattern(pattern) {
  'use strict';
  for (var i = 0; i < pattern.length; i++) {
    var point = pattern[i];
    drawLine(canvasPatern, point.fromRow, point.fromCol, point.toRow, point.toCol, patternColor);
  }
}

function getPostionFromCoordinates(x, y) {
  'use strict';
  var col = Math.floor(x / (circleRadius * 2 + circleSpace));
  var row = Math.floor(y / (circleRadius * 2 + circleSpace));

  return {col: col + 1, row: row + 1};
}

function addToSolution(from, to) {
  'use strict';
  if (from.col > to.col || (from.col === to.col && from.row > to.row)) {
    solution.push({fromCol: to.col, fromRow: to.row, toCol: from.col, toRow: from.row});
  } else {
    solution.push({fromCol: from.col, fromRow: from.row, toCol: to.col, toRow: to.row});
  }
}

function randomNumber(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetRound() {
  'use strict';
  solution = [];
  canvasPatern.clear();
  canvasDraw.clear();

  drawGrid(canvasPatern, gridRows, gridCols, patternColor, false);
  drawGrid(canvasDraw, gridRows, gridCols, drawColor, true);
  drawPattern(drawing.pattern);
}

function startNewRound() {
  'use strict';
  var level = Dyslexio.getLevel('connect-dots');
  indexOfDrawing = getDrawingIndex(level);  
  drawing = drawingsArray[indexOfDrawing];
  gridRows = drawing.rows;
  gridCols = drawing.cols;

  resetRound();
}

function getDrawingIndex(level) {
  'use strict';
  if (countUsedDrawings[level] === countOfDrawings) {
    countUsedDrawings[level] = 0;
    markUsed[level] += 1;
  }
  var index;
  while (true) {
    index = randomNumber(level  * countOfDrawings, (level + 1) * countOfDrawings - 1);
    if (usedDrawings[index] !== markUsed[level]) {
      usedDrawings[index] = markUsed[level];
      countUsedDrawings[level] += 1;
      break;
    }
  }
  return index;
}

function init() {
  'use strict';
  var jsonData = JSON.parse($('#helpDiv').text());
  drawingsArray = jsonData.drawings;
  countOfDrawings = jsonData.countOfDrawingsForEachLevel;
  var length = countOfDrawings * countLevels;
  while (length) {
    usedDrawings.push(0);
    length -= 1;
    if (length < countLevels) {
      countUsedDrawings.push(0);
      markUsed.push(1);
    }
  }
  initCanvases();
  startNewRound();
}

function isCorrectSolution() {
  'use strict';
  for (var i = 0; i < drawing.pattern.length; i++) {
    var found = false;
    for (var j = 0; j < solution.length; j++) {
      if (drawing.pattern[i].fromCol === solution[j].fromCol &&
        drawing.pattern[i].fromRow === solution[j].fromRow &&
        drawing.pattern[i].toCol === solution[j].toCol &&
        drawing.pattern[i].toRow === solution[j].toRow) {

        found = true;
        break;
      }
    }
    
    if (!found) {
      return false;
    }
  }

  return true;
}

function checkSolution() {
  'use strict';
  console.log(solution);
  if (isCorrectSolution()) {
    alert('Поздравления! Решихте правилно задачата');
    Dyslexio.correctSolution('connect-dots');
    startNewRound();
  } else {
    alert('Имате грешки в решението. Опитайте отново');
    Dyslexio.incorrectSolution('connect-dots');
  }
}

$(function () {
  'use strict';
  $('#checkButton').click(checkSolution);
  $('#resetButton').click(resetRound);
  $('#newRoundButton').click(startNewRound);
  $('#helpDiv').load(fileName, init);    
});
