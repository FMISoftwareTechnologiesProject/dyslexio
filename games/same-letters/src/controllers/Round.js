function Round(text, time) {
  this.text = new Text(text);
  this.time = time || Infinity;
  this.ticks = 0;
  EventEmitter.call(this);
}

Round.prototype = Object.create(EventEmitter.prototype);

Round.prototype.start = function () {
  var self = this;
  setInterval(function () {
    if (self.ticks > self.time) {
      self.trigger('game-end');
      return;
    }
    self.ticks += 1;
    self.trigger('tick', [self.ticks]);
  }, 1000);
};

Round.prototype.onTick = function (cb) {
  this.addListener('tick', cb);
};

