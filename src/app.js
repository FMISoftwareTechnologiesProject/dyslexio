/* Main JS file */

'use strict';

Dyslexio.Models.GameFactory.init()
.done(function (data) {
  Dyslexio.Views.SideNav.init(data);
  console.log('Initialized', data);
  Dyslexio.Models.GameFactory.getInstance()
  .getGame('game1');
});
