'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Views = Dyslexio.Views || {};

Dyslexio.Views.GameContainer = {
  container: $('#game-container'),
  selected: null,
  init: function () {
    var self = this;
    Dyslexio.PubSub.subscribe('game.selected', function (e, data) {
      if (self.selected !== data.id) {
        self.loadGame(data);
        self.selected = data.id;
      }
    });
  },
  loadGame: function (data) {
    var self = this;
    Dyslexio.Models
    .GameFactory.getInstance()
    .getGame(data.id)
    .done(function (game) {
      self.renderGame(game);
    });
  },
  renderGame: function (game) {
    var self = this;
    this.container.html(game.template);
    $.each(game.scripts, function (idx, script) {
      if (!$('#src' + game.id + idx)[0]) {
        self.loadScript(game.id, idx, script);
      }
    });
  },
  loadScript: function (gameId, scriptId, script) {
    var src = document.createElement('script');
    src.id = 'scr' + gameId + scriptId;
    src.innerHTML = script;
    document.body.appendChild(src);
  }

};

Dyslexio.Views.GameContainer.init();