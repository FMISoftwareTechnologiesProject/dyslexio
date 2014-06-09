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
    .setDifficultyLevel(new Dyslexio.Models.DifficultyLevel(level));
};

