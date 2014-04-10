'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Views = Dyslexio.Views || {};

Dyslexio.Views.PageContainer = {
  container: $('#page-container'),
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
  loadTemplate: function (page) {
    console.log('Loading', page);
    this.container.empty();
    this.container.load(page);
  },
  loadGame: function (gameId) {
    var game = Dyslexio.Models
          .GameFactory.getInstance()
          .getGame(gameId),
        iframe = $('<iframe class="game-iframe" />');
    this.container.empty();
    this.container.append(iframe);
    iframe.attr('src', game.url);
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

Dyslexio.Views.PageContainer.init();