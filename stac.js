
function Stac(options) {
  var self = this;

  options = options || {};

  this._options = options;
  this._sorted = false;
  this._stack = [];
  this._prop = options.prop || 'weight';
  this._defaultVal = options.defaultVal || 0;

  this._comparator = options.comparator || function (a, b) {
    if (a.val === b.val) return 0;
    return a.val < b.val ? -1 : 1;
  };

  this.__defineGetter__('length', function () {
    return self._stack.length;
  });
}

Stac.prototype._getVal = function (obj) {
  if (typeof obj[this._prop] !== 'undefined') {
    return obj[this._prop];
  }
  return this._defaultVal;
};

Stac.prototype._sort = function () {
  var self = this;
  if (this._sorted) return;
  this._stack.sort(function (a, b) {
    if ((a.first === b.first) && (a.last === b.last)) {
      return self._comparator(a, b);
    }
    else if (a.first || b.last) {
      return -1;
    }
    else {
      return 1;
    }
  });
  this._sorted = true;
};

Stac.prototype.add = function (val, obj) {
  if (typeof obj === 'undefined') {
    obj = val;
    val = undefined;
  }

  var item = {
    val: (typeof val !== 'undefined') ? val : this._getVal(obj),
    obj: obj
  };

  this._stack.push(item);
  this._sorted = false;
};

Stac.prototype.remove = function (obj) {
  var i = this._stack.length;
  while (i--) {
    if (this._stack[i].obj === obj) {
      this._stack.splice(i, 1);
    }
  }
  this._sorted = false;
};

Stac.prototype.first = Stac.prototype.unshift = function (val, obj) {
  if (typeof obj === 'undefined') {
    obj = val;
    val = undefined;
  }

  var item = {
    first: true,
    val: (typeof val !== 'undefined') ? val : this._getVal(obj),
    obj: obj
  };

  this._stack.push(item);
  this._sorted = false;
};

Stac.prototype.last = Stac.prototype.push = function (val, obj) {
  if (typeof obj === 'undefined') {
    obj = val;
    val = undefined;
  }

  var item = {
    last: true,
    val: (typeof val !== 'undefined') ? val : this._getVal(obj),
    obj: obj
  };

  this._stack.push(item);
  this._sorted = false;
};

Stac.prototype.forEach = function (iterator, thisArg) {
  this._sort();
  this._stack.forEach(iterator, thisArg);
};

Stac.prototype.pop = function () {
  this._sort();
  var item = this._stack.pop();
  return item ? item.obj : undefined;
};

Stac.prototype.shift = function () {
  this._sort();
  var item = this._stack.shift();
  return item ? item.obj : undefined;
};

Stac.prototype.clone = function () {
  var clone = new Stac(this._options);
  clone._stack = this._stack.slice(0);
  return clone;
};

module.exports = Stac;
