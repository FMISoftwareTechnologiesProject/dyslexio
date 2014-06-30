$(window).load(function () {
  var game = new Game();
  game.setLevel(Dyslexio.getLevel('punctuation'));
  game.start();
  $('#container').show();
});
