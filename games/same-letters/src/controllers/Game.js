function Game() {
  this.texts = {};
  this.texts[LEVELS.BEGINNER] = ['Бавно спуска се нощта', 'Та ти отприщаш ги стихиите', 'Имало някога една поетеса'];
  this.texts[LEVELS.NOVICE] = ['След войната за кратко е част от Фрайкорпс, а при сформирането на Райхсвера', 'В началото на 1939 г. е възпроизведен в звание генерал-майор и командир на дивизия', 'Заедно с дивизията участва в битката за Франция, като част от танкова група Клайст'];
  this.texts[LEVELS.MASTER] = ['Роден е в Малко Търново на 20 март 1879 година в семейството на Тодор и Кераца. Завършва I клас. Емигрира в България и в 1896 година постъпва на служба като подофицер в Двадесет и четвърти пехотен черноморски полк на Българската армия', 'През Илинденско-Преображенско въстание участва в нападението на Василико. При потушаването на въстанието четата му охранява българските бежанци до границата с България от турската армия и башибозук.'];
  this.currentLevel = LEVELS.BEGINNER;
  this.currentRound = 0;
}

Game.prototype.setLevel = function (lvl) {
  this.currentLevel = lvl;
};

Game.prototype.start = function () {
  if (this.currentRound >= this.texts[this.currentLevel].length) {
    this.currentRound = 0;
  }
  var self = this;
  this.view = new GameView($('#container'));
  this.selected = {};
  this.text = new Text(this.texts[this.currentLevel][this.currentRound]);
  var differentLetters = this.text.getDifferentLetters();
  var picker = new ColorPicker();
  this.view.colors.empty();
  this.view.colors.append(picker.generate(differentLetters));
  picker.onColorSelected(this.colorSelected.bind(this));
  this.text.onLetterClick(this.letterClicked.bind(this));
  this.view.setText(this.text.render());
  this.marked = 0;
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
      this.start();
    }
  } else {
    alert('Избрал си буквата ' + this.currentLetter);
  }
};

