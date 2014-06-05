/* global alert: false */

'use strict';

function Text(text) {
  this.text = text;
  EventEmitter.call(this);
}

Text.prototype = Object.create(EventEmitter.prototype);

Text.prototype.render = function (container) {
  var wrapper = $('<div class="word" />'),
      self = this,
      letter;
  this.text.split('').forEach(function (l) {
    letter = $('<span class="word-letter">' + l + '</span>');
    letter.click(function () {
      self.trigger('letter-clicked', l, $(this));
    });
    letter.appendTo(wrapper);
  });
  return wrapper;
};

Text.prototype.onLetterClick = function (cb) {
  this.addListener('letter-clicked', cb);
};

Text.prototype.getDifferentLetters = function () {
  var res = {};
  for (var i = 0; i < this.text.toUpperCase().length; i += 1) {
    res[this.text[i]] = true;
  }
  return Object.keys(res);
};





function Round(text, time) {
  this.text = new Text(text);
  this.time = time || Infinity;
  this.ticks = 0;
  EventEmitter.call(this);
}

Round.prototype = Object.create(EventEmitter.prototype);

Round.prototype.start = function () {
  var self = this;
  setInterval(function () {
    if (self.ticks > self.time) {
      self.trigger('game-end');
      return;
    }
    self.ticks += 1;
    self.trigger('tick', [self.ticks]);
  }, 1000);
};

Round.prototype.onTick = function (cb) {
  this.addListener('tick', cb);
};




function GameView(container) {
  this.timer = container.find('.timer');
  this.text = container.find('.text');
  this.colors = container.find('.colors');
}

GameView.prototype.updateTime = function (val) {
  this.timer.text(val);
};

GameView.prototype.setText = function (text) {
  this.text.empty();
  this.text.append(text);
};

function Colors() {
}

Colors.generate = function (count) {
  var colors = [], hue, lightness, saturation;
  for (var i = 0; i < count; i += 1) {
    hue = (i / 360);
    lightness = (50 + Math.random() * 10) / 100;
    saturation = (90 + Math.random() * 10) / 100;
    colors.push(Colors.HSVtoRGB(hue, lightness, saturation));
  }
  return colors;
};

Colors.HSVtoRGB = function (h, s, l){
  function hue2rgb(p, q, t){
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  var r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};


function ColorPicker() {
  EventEmitter.call(this);
}

ColorPicker.prototype = Object.create(EventEmitter.prototype);

ColorPicker.prototype.colorSelected = function (letter, color) {
  this.trigger('on-color-selected', letter, color);
};

ColorPicker.prototype.onColorSelected = function (fn) {
  this.addListener('on-color-selected', fn);
};

ColorPicker.prototype.generate = function (letters) {
  var colors = Colors.generate(letters.length),
      picker = $('<div class="color-picker"></div>'),
      c, cell, self = this;
  letters.forEach(function (l, idx) {
    c = colors[idx];
    l = l.toUpperCase();
    cell = $('<span class="color-picker-cell" style="background-color: rgb('+ c[0] + ',' + c[1] + ',' + c[2] + ');">' + l + '</span>');
    cell.on('click', self.colorSelected.bind(self, l, c));
    picker.append(cell);
  });
  return picker;
};




function Game() {
  this.texts = ['Some long sentance blqlqlq foo and bar'];
  this.currentRound = 0;
}

Game.prototype.start = function () {
  var self = this;
  this.round = new Round();
  this.view = new GameView($('#container'));
  this.round.onTick(function (tick) {
    self.view.updateTime(tick);
  });
  this.selected = {};
  this.text = new Text(this.texts[this.currentRound]);
  var differentLetters = this.text.getDifferentLetters();
  var picker = new ColorPicker();
  this.view.colors.append(picker.generate(differentLetters));
  picker.onColorSelected(this.colorSelected.bind(this));
  this.text.onLetterClick(this.letterClicked.bind(this));
  this.view.setText(this.text.render());
  this.round.start();
  this.currentRound += 1;
};

Game.prototype.colorSelected = function (l, color) {
  this.currentLetter = l;
  this.currentColor = color;
};

Game.prototype.lettersLeft = function (l) {
  var c = this.selected[l] || 0,
      t = this.text.text, count = 0;
  for (var i = 0; i < t.length; i += 1) {
    if (t[i].toUpperCase() === l) {
      count += 1;
    }
  }
  return c < count;
};

Game.prototype.letterClicked = function (l, elem) {
  l = l.toUpperCase();
  if (!this.lettersLeft(l)) {
    alert('Избери друга буква. Вече си познал всички букви от този тип!');
  }
  if (l.toUpperCase() === this.currentLetter) {
    var c = this.currentColor;
    elem.css('background-color', 'rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ')');
    this.selected[l] = this.selected[l] || 0;
    this.selected[l] += 1;
  } else {
    alert('Избрал си буквата ' + this.currentLetter);
  }
};

var game = new Game();
game.start();