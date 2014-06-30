'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Views = Dyslexio.Views || {};

Dyslexio.Views.PageContainer = {

  container: $('#page-container'),

  spinner: $('#spinner'),

  selected: null,

  pageCache: {},

  player: $('#game-audio-instructions'),

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
    $('.audio-icon').hide();
  },

  showAudio: function (game) {
    $('.audio-icon').show();
    this.player.show();
    var instructions = {};
    for (var audio in game.instructions) {
      instructions[audio] =
        game.url + '/' + game.instructions[audio];
    }
    this.player.attr('src',
      instructions[Object.keys(instructions)[0]]);
  },

  loadGame: function (gameId) {
    var game = Dyslexio.Models
          .GameFactory.getInstance()
          .getGame(gameId),
        iframe = $('<iframe class="game-iframe" />'),
        self = this;
    this.hidePlayer();
    this.startLoading();
    this.container.empty();
    this.container.append(iframe);
    iframe.attr('src', location.origin + '/' + game.url);
    iframe.load(function () {
      Dyslexio.Models.DifficultyLevelManager.init()
      .then(function () {
        iframe[0].contentWindow.Dyslexio = {
          setLevel: function (level) {
            game.setLevel(level);
            console.log(gameId);
          },
          getLevel: function (gameId) {
            return game.getLevel(gameId);
          },
          correctSolution: function(gameId) {
            game.correctSolution(gameId);
          },
          incorrectSolution: function(gameId) {
            game.incorrectSolution(gameId);
          }
        };
        self.endLoading();
        iframe[0].contentWindow.initGame();
      });
    });
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

