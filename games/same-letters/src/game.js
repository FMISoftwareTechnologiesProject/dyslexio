'use strict';

function Word(text) {
  this.text = text;
  EventEmitter.call(this);
}

Word.prototype = Object.create(EventEmitter.prototype);

Word.prototype.render = function (container) {
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
};

Word.prototype.onLetterClick = function (cb) {
  this.addListener('letter-clicked', cb);
};