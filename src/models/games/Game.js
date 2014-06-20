'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Models = Dyslexio.Models || {};

Dyslexio.Models.Game = function (game) {
  this.id = game.id;
  this.description = game.description;
  this.instructions = game.instructions;
  this.url = Dyslexio.CONFIG.GAMES_BASE + '/' + this.id;
};

Dyslexio.Models.Game.prototype.setLevel = function (level) {
  Dyslexio.Models.DifficultyLevelManager.getInstance()
    .setDifficultyLevel(new Dyslexio.Models.DifficultyLevel(level, 0));
};

Dyslexio.Models.Game.prototype.getLevel = function (gameId) {
    return Dyslexio.Models.DifficultyLevelManager.getInstance()
    .getDifficultyLevel(gameId);
};

Dyslexio.Models.Game.prototype.correctSolution = function (gameId) {
  Dyslexio.Models.DifficultyLevelManager.getInstance().correctSolution(gameId);
  console.log("INCREMENTING");
};

Dyslexio.Models.Game.prototype.incorrectSolution = function (gameId) {
  Dyslexio.Models.DifficultyLevelManager.getInstance().incorrectSolution(gameId);
  console.log("DECREMENTING");
};


