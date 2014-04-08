'use strict';

var Dyslexio = Dyslexio || {};
Dyslexio.Models = Dyslexio.Models || {};

Dyslexio.Models.Game = function (game) {
  this.id = game.id;
  this.description = game.description;
  this.url = Dyslexio.CONFIG.GAMES_BASE + '/' + this.id;
  this.template = null;
  this.scripts = [];
  this.styles = [];
};

Dyslexio.Models.Game.prototype.load = function () {

  function getURL(url, selfUrl) {
    return selfUrl + '/' + url.replace(location.href, '');
  }

  var self = this;
  return $.get(this.url + '/index.html')
  .then(function (data) {
    data = $('<section>' + data + '</section>');
    var promises = [], promise, url, map;
    data.find('script,style').each(function (id, ref) {
      if (ref.tagName.toLowerCase() === 'script') {
        url = getURL(ref.src, self.url);
        map = self.scripts;
      } else {
        url = getURL(ref.href, self.url);
        map = self.styles;
      }
      promise = $.ajax({
        type: 'get',
        dataType: 'text',
        success: function (data) {
          return map.push(data);
        },
        url: url
      });
      promises.push(promise);
      ref.remove();
    });
    self.template = data.html();
    return $.when(promises).then(function () {
      self.loaded = true;
      return self;
    });
  });
};

Dyslexio.Models.Game.prototype.get = function () {
  if (this.loaded) {
    return $.when(this);
  } else {
    return this.load();
  }
};
