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
      self.trigger('letter-clicked', [l]);
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
  for (var i = 0; i < this.text.length; i += 1) {
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

Colors.prototype.generate = function (count) {
};


function ColorPicker() {
}

ColorPicker.prototype.generateForLetters = function () {
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
  var text = new Text(this.texts[this.currentRound]);
  var differentLetters = text.getDifferentLetters();
  this.view.setText(text.render());
  this.round.start();
  this.currentRound += 1;
};

var game = new Game();
game.start();