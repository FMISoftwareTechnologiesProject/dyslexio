/* Main JS file */

'use strict';

var Dyslexio = Dyslexio || {};

Dyslexio.PubSub = {};

(function (pubsub, $) {
  var o = $({});
  pubsub.subscribe = function () {
    o.on.apply(o, arguments);
  };
  pubsub.unsubscribe = function () {
    o.off.apply(o, arguments);
  };
  pubsub.publish = function () {
    o.trigger.apply(o, arguments);
  };
}(Dyslexio.PubSub, jQuery));

Dyslexio.PubSub.subscribe('game.selected', function (g) {
  console.log(g);
});

Dyslexio.Models.GameFactory.init()
.done(function (data) {
  Dyslexio.Views.SideNav.init(data);
  console.log('Initialized', data);
  Dyslexio.Models.GameFactory.getInstance()
  .getGame('game1');
});
