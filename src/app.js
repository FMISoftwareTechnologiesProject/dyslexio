/* Main JS file */

'use strict';

GameFactory.init()
.done(function (data) {
  console.log('Initialized', data);
  GameFactory.getInstance()
  .getGame('game1');
});
