'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Views = Dyslexio.Views || {};

Dyslexio.Views.SideNav = {
  el: $('#side-nav'),
  buildMenuItem: function (game) {
    var li = $('<li/>'),
        item = $('<a href="#/game/' + game.id + '"/>');
    item.data('game-id', game.id);
    item.text(game.title);
    li.append(item);
    li.click(function () {
      Dyslexio.PubSub.publish('game.selected', { id: game.id });
    });
    return li;
  },
  init: function (games) {
    for (var i = 0; i < games.length; i += 1) {
      this.el.append(this.buildMenuItem(games[i]));
    }
  }
};