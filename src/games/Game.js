'use strict';

function Game(game) {
  this.id = game.id;
  this.description = game.description;
  this.url = CONFIG.GAMES_BASE + '/' + this.id;
  this.template = null;
  this.scripts = [];
  this.styles = [];
}

Game.prototype.load = function () {
  var self = this;
  return $.get(this.url + '/index.html')
  .then(function (data) {
    self.template = data;
    data = '<section>' + data + '</section>';
    var promises = [], promise;
    $(data).find('script,style').each(function (ref) {
      if (ref.tagName.toLowerCase() === 'script') {
        promise = $.get(ref.src).then(function (data) {
          return self.scripts.push(data);
        });
      } else {
        promise = $.get(ref.href).then(function (data) {
          return self.styles.push(data);
        });
      }
      promises.push(promise);
    });
    return $.when(promises).then(function () {
      self.loaded = true;
      return self;
    });
  });
};

Game.prototype.get = function () {
  if (this.loaded) {
    return $.when(this);
  } else {
    return this.load();
  }
};
