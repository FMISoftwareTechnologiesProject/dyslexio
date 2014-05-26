'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Views = Dyslexio.Views || {};

Dyslexio.Views.PageContainer = {

  container: $('#page-container'),

  spinner: $('#spinner'),

  selected: null,

  pageCache: {},

  player: $('#jp_container_1'),

  init: function () {
    var self = this;
    $('.audio-icon').click(function () {
      if (self.player.is('.transparent')) {
        self.showPlayer();
      } else {
        self.hidePlayer();
      }
    });
  },

  hidePlayer: function () {
    this.player.addClass('transparent');
  },

  showPlayer: function () {
    this.player.show();
    this.player.removeClass('transparent');
  },

  startLoading: function () {
    this.spinner.removeClass('transparent');
  },

  endLoading: function () {
    this.spinner.addClass('transparent');
  },

  loadTemplate: function (page) {
    var self = this;
    this.startLoading();
    this.hideAudio();
    this.container.empty();
    if (this.pageCache[page]) {
      this.container.html(this.pageCache[page]);
      this.endLoading();
    } else {
      console.log('Loading', page);
      $.get(page)
      .done(function (template) {
        self.container.html(template);
        self.pageCache[page] = template;
        self.endLoading();
      });
    }
  },

  hideAudio: function () {
    this.player.hide();
    $('#jquery_jplayer_1').hide();
    $('.audio-icon').hide();
  },

  showAudio: function (game) {
    var self = this;
    $('.audio-icon').show();
    $('#jquery_jplayer_1').jPlayer({
      ready: function () {
        for (var audio in game.instructions) {
          game.instructions[audio] =
            game.url + '/' + game.instructions[audio];
        }
        $(this).jPlayer('setMedia', game.instructions);
        self.player.hide();
        self.player.addClass('transparent');
      },
      ended: function () {
        $('#jp_audio_0').removeAttr('src');
        $('#jp_audio_0').attr('src', game.instructions.m4a);
      },
      swfPath: '/js',
      volume: 1,
      supplied: 'm4a, ogg',
      cssSelectorAncestor: '#jp_container_1',
      wmode: 'window',
      keyEnabled: true
    });
  },

  loadGame: function (gameId) {
    var game = Dyslexio.Models
          .GameFactory.getInstance()
          .getGame(gameId),
        iframe = $('<iframe class="game-iframe" />'),
        self = this;
    this.startLoading();
    this.container.empty();
    this.container.append(iframe);
    iframe.attr('src', game.url);
    iframe[0].onload = function () {
      self.endLoading();
    };
    console.log('Loading game', gameId);
    if (game.instructions) {
      this.showAudio(game);
    } else {
      this.hideAudio();
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

