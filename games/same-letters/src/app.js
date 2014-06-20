var game = new Game();
$('#container').hide();
$('[name="level"]').change(function (e) {
  game.setLevel(LEVELS[e.currentTarget.value]);
  game.start();
  $('#container').show();
  $('#level-dialog').hide();
});