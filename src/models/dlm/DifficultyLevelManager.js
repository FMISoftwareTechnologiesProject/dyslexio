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
    var dls = [];
    for (var difficultyLevel in this.difficultyLevels) {
      dls.push(this.difficultyLevels[difficultyLevel]);
    }
    return dls;
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

        $.each(games, function (idx) {
          //self.games[games[idx].id] = new Dyslexio.Models.Game(games[idx]);
          self.difficultyLevels[games[idx].id] = new Dyslexio.Models.DifficultyLevel('3');
          
        });
        console.log(self);
        return INSTANCE;
      })
      .fail(function () {
        console.log('Prase error in games.json');
      });
    }
  };
}());
