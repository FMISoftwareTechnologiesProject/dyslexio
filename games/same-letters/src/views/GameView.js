
function GameView(container) {
  this.text = container.find('.text');
  this.colors = container.find('.colors');
}

GameView.prototype.setText = function (text) {
  this.text.empty();
  this.text.append(text);
};

