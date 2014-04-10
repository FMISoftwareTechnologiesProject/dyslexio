/* Main JS file */

'use strict';

crossroads.addRoute('/', Router.handlePage);
crossroads.addRoute('/about', Router.handlePage);
crossroads.addRoute('/help', Router.handlePage);
crossroads.addRoute('/game/{id}', Router.handleGame);
$(window).hashchange(function () {
  var hash = location.href.hash || '#';
  crossroads.parse(hash.substring(1, hash.length));
});

Dyslexio.Models.GameFactory.init()
.done(function (data) {
  Dyslexio.Views.SideNav.init(data);
  console.log('Initialized', data);
  Dyslexio.Models.GameFactory.getInstance()
  .getGame('game1');
});
