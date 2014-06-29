'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Models = Dyslexio.Models || {};

Dyslexio.Models.DifficultyLevel = function (level, mistakes, currentWins) {
  this.level = level;
  this.mistakes = mistakes;
  this.currentWins = currentWins;
};

Dyslexio.Models.DifficultyLevel.prototype.getLevel = function () {
	 return this.level;
};

Dyslexio.Models.DifficultyLevel.prototype.setLevel = function (level) {
	 return this.level = level;
};

Dyslexio.Models.DifficultyLevel.prototype.getMistakes = function () {
	 return this.mistakes;
};

Dyslexio.Models.DifficultyLevel.prototype.setMistakes = function (mistakes) {
	 return this.mistakes = mistakes;
};

Dyslexio.Models.DifficultyLevel.prototype.getCurrentWins = function () {
	 return this.currentWins;
};

Dyslexio.Models.DifficultyLevel.prototype.setCurrentWins = function (currentWins) {
	 return this.currentWins = currentWins;
};
