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
        self.loadGame(data.id);
        self.selected = data.id;
      }
    });
    $('.audio-icon').click(function () {
      $('#jp_container_1').toggle();
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
    console.log('Loading game', gameId);
    if (game.instructions) {
      $('.audio-icon').show();
      $('#jquery_jplayer_1').jPlayer({
        ready: function () {
          for (var audio in game.instructions) {
            game.instructions[audio] =
              game.url + '/' + game.instructions[audio];
          }
          $(this).jPlayer('setMedia', game.instructions);
        },
        swfPath: '/js',
        supplied: 'm4a, oga'
      });
    } else {
      $('#jp_container_1').hide();
      $('.audio-icon').hide();
    }
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