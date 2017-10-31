export default class Stac {
  private _stack: any[];
  private _sorted: boolean;
  private _options: any;
  private _sortBy: string;
  private _defaultVal: number;
  private _comparator: (a: any, b: any) => number;
  [key: string]: any;

  constructor(options?: Object, items?: any) {
    if (Array.isArray(options)) {
      items = options;
      options = {};
    }

    this._stack = [];
    this._sorted = false;
    this._options = options || {};
    this._sortBy = this._options.sortBy || "weight";
    this._defaultVal = this._options.defaultVal || 0;

    this._comparator =
      this._options.comparator ||
      function comparator(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
      };

    if (items) {
      this.multi("add", items);
    }
  }

  get length() {
    return this._stack.length;
  }

  _getVal(item: any) {
    if (typeof item.val !== "undefined") {
      return item.val;
    }
    if (typeof this._sortBy === "function") {
      return this._sortBy(item.obj);
    }
    if (typeof item.obj[this._sortBy] !== "undefined") {
      return item.obj[this._sortBy];
    }
    return this._defaultVal;
  }

  _sort() {
    if (this._sorted) return;
    this._stack.sort((a, b) => {
      if (a.first === b.first && a.last === b.last) {
        return this._comparator(this._getVal(a), this._getVal(b));
      } else if (a.first || b.last) {
        return -1;
      } else {
        return 1;
      }
    });
    this._sorted = true;
  }

  add(val: any, obj?: any) {
    if (typeof obj === "undefined") {
      obj = val;
      val = undefined;
    }

    var item = {
      val: val,
      obj: obj
    };

    this._stack.push(item);
    this._sorted = false;
    return this;
  }

  remove(obj: any) {
    var i = this._stack.length;
    while (i--) {
      if (this._stack[i].obj === obj) {
        this._stack.splice(i, 1);
      }
    }
    this._sorted = false;
    return this;
  }

  first(val: any, obj?: any) {
    if (typeof obj === "undefined") {
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
    return this;
  }

  unshift(val: any, obj: any) {
    return this.first(val, obj);
  }

  last(val: any, obj?: any) {
    if (typeof obj === "undefined") {
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
    return this;
  }

  push(val: any, obj?: any) {
    return this.last(val, obj);
  }

  multi(method: string, items: any[]) {
    items.forEach(item => {
      this[method](item);
    });
    return this;
  }

  items() {
    this._sort();
    return this._stack.map(item => {
      return item.obj;
    });
  }

  toJSON() {
    return this.items();
  }

  map(iterator: (item: any, i: number) => any[], thisArg: any) {
    return this.items().map(iterator, thisArg);
  }

  forEach(iterator: (item: any, i: number) => void, thisArg: any) {
    return this.items().forEach(iterator, thisArg);
  }

  pop() {
    this._sort();
    var item = this._stack.pop();
    return item ? item.obj : undefined;
  }

  shift() {
    this._sort();
    var item = this._stack.shift();
    return item ? item.obj : undefined;
  }

  clone() {
    var clone = new Stac(this._options);
    clone._stack = this._stack.slice(0);
    clone._sorted = this._sorted;
    return clone;
  }
}
