stac
====

Maintain a sorted stack of things.

[![build status](https://secure.travis-ci.org/cpsubrian/node-stac.png)](http://travis-ci.org/cpsubrian/node-stac)

![Puzzle](http://www.stageslearning.com/files/free-resources/blog_images/ring%20stack.jpg)


Examples
--------

*Add arbitrary things to a stack*
```js
var Stac = require('stac')
  , stack = new Stac();

stack.add('A');
stack.add(23);
stack.add(['foo', 'bar']);

stack.first({my: 'Object'});
stack.last('The End');

console.log(stack.items());
// [ { my: 'Object' }, 'A', 23, [ 'foo', 'bar' ], 'The End']
```

*Add things to a stack with weights*
```js
var Stac = require('stac')
  , stack = new Stac();

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

API
---



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
