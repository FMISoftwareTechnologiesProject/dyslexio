'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Models = Dyslexio.Models || {};

Dyslexio.Models.DifficultyLevel = function (level, mistakes) {
  this.level = level;
  this.mistakes = mistakes;
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

