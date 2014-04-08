'use strict';

var SideNav = {
  el: $('#side-nav'),
  buildMenuItem: function (game) {
    var item = $('<li/>');
    item.data('game-id', game.id);
    item.text(game.title);
  },
  init: function (games) {
    for (var i = 0; i < games.length; i += 1) {
      this.el.append(this.buildMenuItem(games[i]));
    }
  }
};