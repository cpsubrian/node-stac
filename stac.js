
function Stac(options) {
  var self = this;

  options = options || {};

  this._options = options;
  this._sorted = false;
  this._stack = [];
  this._sortBy = options.sortBy || 'weight';
  this._defaultVal = options.defaultVal || 0;

  this._comparator = options.comparator || function (a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  };

  this.__defineGetter__('length', function () {
    return self._stack.length;
  });
}

Stac.prototype._getVal = function (item) {
  if (typeof item.val !== 'undefined') {
    return item.val;
  }
  if (typeof this._sortBy === 'function') {
    return this._sortBy(item.obj);
  }
  if (typeof item.obj[this._sortBy] !== 'undefined') {
    return item.obj[this._sortBy];
  }
  return this._defaultVal;
};

Stac.prototype._sort = function () {
  var self = this;
  if (this._sorted) return;
  this._stack.sort(function (a, b) {
    if ((a.first === b.first) && (a.last === b.last)) {
      return self._comparator(self._getVal(a), self._getVal(b));
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
    val: val,
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
    val: val,
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
    val: val,
    obj: obj
  };

  this._stack.push(item);
  this._sorted = false;
};

Stac.prototype.items = Stac.prototype.toJSON = function () {
  this._sort();
  return this._stack.map(function (item) {
    return item.obj;
  });
};

Stac.prototype.map = function (iterator, thisArg) {
  return this.items().map(iterator, thisArg);
};

Stac.prototype.forEach = function (iterator, thisArg) {
  this._sort();
  this._stack.forEach(function (item, i) {
    iterator.call(thisArg, item.obj, i);
  }, thisArg);
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

module.exports = function createStac (options) {
  return new Stac(options);
};
module.exports.Stac = Stac;
