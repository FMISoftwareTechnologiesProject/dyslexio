
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

