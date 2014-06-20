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
    if (l === ' ') {
      letter = $('<span class="word-letter word-letter-disabled">' + l + '</span>');
    } else {
      letter = $('<span class="word-letter">' + l + '</span>');
      letter.click(function () {
        self.trigger('letter-clicked', l, $(this));
      });
    }
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
    if (this.text[i] !== ' ') {
      res[this.text[i]] = true;
    }
  }
  return this.shuffle(Object.keys(res));
};

Text.prototype.shuffle = function (array) {
  var arraySize = array.length - 1,
      rand, temp;
  for (var i = arraySize; i >= 0; i -= 1) {
      rand = Math.round(Math.random() * arraySize);
      temp = array[i];
      array[i] = array[rand];
      array[rand] = temp;
  }
  return array;
};

