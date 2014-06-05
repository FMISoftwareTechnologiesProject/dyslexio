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
  var colors = Colors.generate(letters.length),
      picker = $('<div class="color-picker"></div>'),
      c, cell, self = this;
  letters.forEach(function (l, idx) {
    c = colors[idx];
    l = l.toUpperCase();
    cell = $('<span class="color-picker-cell" style="background-color: rgb('+ c[0] + ',' + c[1] + ',' + c[2] + ');">' + l + '</span>');
    cell.on('click', self.colorSelected.bind(self, l, c));
    picker.append(cell);
  });
  return picker;
};


