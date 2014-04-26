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
    $('#jquery_jplayer_1').jPlayer({
      swfPath: 'src/lib/jplayer/jquery.jplayer/',
      solution: 'html, flash',
      supplied: 'm4a, oga',
      preload: 'metadata',
      volume: 0.8,
      muted: false,
      backgroundColor: '#000000',
      cssSelectorAncestor: '#jp_container_1',
      cssSelector: {
        videoPlay: '.jp-video-play',
        play: '.jp-play',
        pause: '.jp-pause',
        stop: '.jp-stop',
        seekBar: '.jp-seek-bar',
        playBar: '.jp-play-bar',
        mute: '.jp-mute',
        unmute: '.jp-unmute',
        volumeBar: '.jp-volume-bar',
        volumeBarValue: '.jp-volume-bar-value',
        volumeMax: '.jp-volume-max',
        playbackRateBar: '.jp-playback-rate-bar',
        playbackRateBarValue: '.jp-playback-rate-bar-value',
        currentTime: '.jp-current-time',
        duration: '.jp-duration',
        title: '.jp-title',
        fullScreen: '.jp-full-screen',
        restoreScreen: '.jp-restore-screen',
        repeat: '.jp-repeat',
        repeatOff: '.jp-repeat-off',
        gui: '.jp-gui',
        noSolution: '.jp-no-solution'
      },
      errorAlerts: false,
      warningAlerts: false
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

Dyslexio.Views.PageContainer.init();