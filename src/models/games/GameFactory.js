'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Models = Dyslexio.Models || {};

Dyslexio.Models.GameFactory = (function () {

  var INSTANCE;

  function GameFactory() {
    if (!(this instanceof GameFactory)) {
      return new GameFactory();
    }
    this.games = {};
  }

  GameFactory.prototype.getGame = function (id) {
    if (!this.games[id]) {
      console.warn('No game with id', id);
      return null;
    }
    return this.games[id].get();
  };

  return {
    getInstance: function () {
      if (!INSTANCE) {
        throw new Error('The game factory should be initialized');
      }
      return INSTANCE;
    },
    init: function () {
      return $.getJSON(Dyslexio.CONFIG.GAMES_BASE
        + '/' + Dyslexio.CONFIG.GAMES_CONFIG,
      function (games) {
        INSTANCE = GameFactory();
        var self = INSTANCE;
        $.each(games, function (idx) {
          self.games[games[idx].id] = new Dyslexio.Models.Game(games[idx]);
        });
      })
      .fail(function () {
        console.log('Prase error in games.json');
      });
    }
  };
}());
