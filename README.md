stac
====

Maintain a sorted stack of things.

[![build status](https://secure.travis-ci.org/cpsubrian/node-stac.png)](http://travis-ci.org/cpsubrian/node-stac)

![Puzzle](http://www.stageslearning.com/files/free-resources/blog_images/ring%20stack.jpg)


Examples
--------

**Add arbitrary things to a stack**
```js
var createStac = require('stac')
  , stack = createStac();

stack.add('A');
stack.add(23);
stack.add(['foo', 'bar']);

stack.first({my: 'Object'});
stack.last('The End');

console.log(stack.items());
// [ { my: 'Object' }, 'A', 23, [ 'foo', 'bar' ], 'The End']
```


**Add things to a stack with weights**
```js
var createStac = require('stac')
  , stack = createStac();

stack.add(3, 'C');
stack.add(1, 'A');
stack.add(4, 'D');
stack.add(2, 'B');

stack.forEach(function (letter) {
  console.log(letter);
});
// A
// B
// C
// D
```

**Advanced usage: custom sortBy and comparator**
```js
var createStac = require('stac')
var stack = createStac({
  sortBy: function (item) {
    return item.width * item.height;
  },
  comparator: function (a, b) {
    if (a === b) return 0;
    // Reverse sort
    return a < b ? 1 : -1;
  }
});

stack.add({color: 'red', width: 5, height: 4});
stack.add({color: 'green', width: 1, height: 2});
stack.add({color: 'blue', width: 8, height: 2});

console.log(stack.map(function (item) {
  return item.color;
}));
// [ 'red', 'blue', 'green' ]
```

API
---

### createStac([options])

The only export for this module. Returns instances of Stac objects.

```js
var createStac = require('stac');

// Create a stac object.
var stack = createStac();

// Create a stac object with options.
var another = createStac({
  sortBy: 'age'
});
```

### stack.add([val], item)

Add an item to the stack. Optionally pass a value to sort by.

### stack.remove(item)

Remove an item from the stack.

### stack.first([val], item) / stack.unshift([val], item)

Add an item to the front of the stack. Items inserted this way will *always* be sorted
in front of items added with `add()` or `last()`. Within the *first* set, items
will be sorted normally.

### stack.last([val], item) / stack.push([val], item)

Add an item to the end of the stack. Items inserted this way will *always* be
sorted behind items added with `add()` or `first()`. Within the *last* set, items
will be sorted normally.

### stack.clone()

Returns a copy of a stack.

*Note: items in the stack will still reference the originals.*

### stack.items() / stack.toJSON()

Returns the sorted array of items in the stack.

### stack.forEach(iterator, [thisArg])

Iterate over items in the stack (just like `Array.prototype.forEach`).

### stack.map(func, [thisArg])

Returns a mapped representation of the stack (just like an `Array.prototype.map`).

## stack.pop() / stack.shift()

Returns and removes the last/first item from the stack (similar to `Array.prototype.map`).

### stack.length

Returns the current length of the stack.


- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT
Copyright (C) 2012 Terra Eclipse, Inc. ([http://www.terraeclipse.com](http://www.terraeclipse.com))

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
