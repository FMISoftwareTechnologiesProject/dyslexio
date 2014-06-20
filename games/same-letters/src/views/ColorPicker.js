function ColorPicker() {
  EventEmitter.call(this);
}

ColorPicker.prototype = Object.create(EventEmitter.prototype);

ColorPicker.prototype.colorSelected = function (letter, color) {
  this.trigger('on-color-selected', letter, color);
};

ColorPicker.prototype.onColorSelected = function (fn) {
  this.addListener('on-color-selected', fn);
};

ColorPicker.prototype.generate = function (letters) {
  var colors = randomColor({ count: letters.length }),
      picker = $('<div class="color-picker"></div>'),
      c, cell, self = this;
  letters.forEach(function (l, idx) {
    c = colors[idx];
    l = l.toUpperCase();
    cell = $('<span class="color-picker-cell">' + l + '</span>');
    if (!/\s+/.test(l)) {
      cell.css('background-color', c);
    }
    cell.on('click', self.colorSelected.bind(self, l, c));
    picker.append(cell);
  });
  return picker;
};


