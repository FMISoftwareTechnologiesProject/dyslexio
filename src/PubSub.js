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
