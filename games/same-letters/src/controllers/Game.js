function Game() {
  this.texts = ['Some long'];
  this.currentRound = 0;
  this.marked = 0;
}

Game.prototype.start = function () {
  var self = this;
  this.round = new Round();
  this.view = new GameView($('#container'));
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
    elem.css('background-color', c);
    this.marked += 1;
    this.selected[l] = this.selected[l] || 0;
    this.selected[l] += 1;
    if (this.marked === this.text.text.replace(/\s/g, '').length) {
      alert('Поздравления! Вие маркирахте всички букви успешно!');
    }
  } else {
    alert('Избрал си буквата ' + this.currentLetter);
  }
};

