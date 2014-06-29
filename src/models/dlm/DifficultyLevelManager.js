'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Models = Dyslexio.Models || {};

Dyslexio.Models.DifficultyLevelManager = (function () {

  var INSTANCE;

  function DifficultyLevelManager() {
    if (!(this instanceof DifficultyLevelManager)) {
      return new DifficultyLevelManager();
    }
    this.difficultyLevels = {};
  }

  DifficultyLevelManager.prototype.getDifficultyLevels = function () {
    return this.difficultyLevels;
  };

  DifficultyLevelManager.prototype.getDifficultyLevel = function (gameId) {
    return this.difficultyLevels[gameId].getLevel();
  };

  DifficultyLevelManager.prototype.getMistakes = function (gameId) {
    return this.difficultyLevels[gameId].getMistakes();
  };

  DifficultyLevelManager.prototype.setDifficultyLevel = function (gameId, dl) {
    var self = this;
    self.difficultyLevels[gameId] = dl;
    console.log(this.getDifficultyLevels());
    localStorage.setItem('difficultyLevelManager', JSON.stringify(this.getDifficultyLevels()));
  };

  DifficultyLevelManager.prototype.incrementLevel = function (gameId) {
    var level = this.difficultyLevels[gameId].getLevel();
    var currentWins = this.difficultyLevels[gameId].getCurrentWins();
    console.log("CURRENT WINS" + currentWins);
    currentWins++;
    console.log("INCREMENTING CURRENT WINS" + currentWins);
    this.difficultyLevels[gameId].setCurrentWins(currentWins);
    console.log('LEVEL:' + level);
    console.log("CURRENT WINS" + this.difficultyLevels[gameId].getCurrentWins());
    if (currentWins == 3) {
      this.difficultyLevels[gameId].setCurrentWins(0);
      if (level < 2) {
        console.log("LEVEL INCREMENT");
        level++;
        this.difficultyLevels[gameId].setLevel(level);
      }
    }
    console.log(this.getDifficultyLevels());
    localStorage.setItem('difficultyLevelManager', JSON.stringify(this.getDifficultyLevels()));
  };

  DifficultyLevelManager.prototype.decrementLevel = function (gameId) {
    var level = this.difficultyLevels[gameId].getLevel();
    console.log('LEVEL:' + level);
    if (level > 0) {
      console.log("LEVEL DECREMENT");
      level--;
      this.difficultyLevels[gameId].setLevel(level);
    }
    console.log(this.getDifficultyLevels());
    localStorage.setItem('difficultyLevelManager', JSON.stringify(this.getDifficultyLevels()));
  };

  DifficultyLevelManager.prototype.setMistakes = function (gameId, mistakes) {
    this.difficultyLevels[gameId].setMistakes(mistakes);
    localStorage.setItem('difficultyLevelManager', JSON.stringify(this.getDifficultyLevels()));
  };


  DifficultyLevelManager.prototype.correctSolution = function (gameId) {
    console.log(gameId);
    this.incrementLevel(gameId);
  };

  DifficultyLevelManager.prototype.incorrectSolution = function (gameId) {
    var mistakes = this.getMistakes(gameId);
    mistakes++;
    if (mistakes > 2) {
      this.decrementLevel(gameId);
      mistakes = 0;
    }
    console.log('Current mistakes: ' + mistakes);
    this.setMistakes(gameId, mistakes);
  };


  return {
    getInstance: function () {
      if (!INSTANCE) {
        throw new Error('The DLM should be initialized');
      }

      return INSTANCE;
    },
    init: function () {
      //Already initialized
      if (INSTANCE) {
        return $.when(INSTANCE);
      }
      return $.getJSON(Dyslexio.CONFIG.GAMES_BASE
        + '/' + Dyslexio.CONFIG.GAMES_CONFIG,
      function (games) {
        INSTANCE = DifficultyLevelManager();
        var self = INSTANCE;
        if (localStorage.getItem("difficultyLevelManager") === null) {
          $.each(games, function (idx) {
            self.difficultyLevels[games[idx].id] = new Dyslexio.Models.DifficultyLevel(1, 0, 0);
          });
          localStorage.setItem("difficultyLevelManager", JSON.stringify(self.getDifficultyLevels()));
        } else {
          var retrievedObj = localStorage.getItem('difficultyLevelManager');
          console.log(retrievedObj);
          var jsonRetrievedObj = JSON.parse(retrievedObj);
          console.log(jsonRetrievedObj);
          $.each(jsonRetrievedObj, function (i, item) {
            self.difficultyLevels[i] = new Dyslexio.Models.DifficultyLevel(jsonRetrievedObj[i].level, jsonRetrievedObj[i].mistakes, jsonRetrievedObj[i].currentWins);
          });

        }
        
        console.log(self);
        return INSTANCE;
      })
      .fail(function () {
        console.log('Parse error in games.json');
      });
    }
  };
}());
