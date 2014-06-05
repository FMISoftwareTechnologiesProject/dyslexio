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


