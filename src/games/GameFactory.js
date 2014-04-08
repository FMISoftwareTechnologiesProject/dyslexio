'use strict';

var GameFactory = (function () {

  var INSTANCE;

  function GameFactory() {
    if (!(this instanceof GameFactory)) {
      return new GameFactory();
    }
    this.games = {};
  }

  GameFactory.prototype.getGame = function (id) {
  };

  return {
    getInstance: function () {
      var args = Array.prototype.slice.call(arguments, 1);
      return (INSTANCE = GameFactory.apply(null, args));
    },
    init: function () {
      var self = this;
      return $.getJSON(CONFIG.GAMES_BASE + '/' + CONFIG.GAMES_CONFIG)
      .then(function (games) {
        $.each(games, function (idx) {
          self.games.push(new Game(games[idx]));
        });
      });
    }
  };
}());
