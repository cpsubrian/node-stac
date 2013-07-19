var Stac = require('../');

describe('basic test', function () {
  var stack;

  beforeEach(function () {
    stack = new Stac();
  });

  it('add() - adds items in insertion order', function () {
    stack.add('one');
    stack.add('two');
    stack.add('three');
    stack.add('four');

    assert.equal(stack.pop(), 'four');
    assert.equal(stack.shift(), 'one');
    assert.equal(stack.pop(), 'three');
    assert.equal(stack.pop(), 'two');
    assert.equal(stack.pop(), undefined);
    assert.equal(stack.shift(), undefined);
  });

  it('add() - adds items at a specific value', function () {
    stack.add(2, 'two');
    stack.add(1, 'one');
    stack.add(3, 'three');

    assert.equal(stack.shift(), 'one');
    assert.equal(stack.pop(), 'three');
  });

  it('remove() - removes items', function () {
    stack.add('one');
    stack.add('two');
    stack.add('three');

    stack.remove('two');
    assert.equal(stack.length, 2);

    stack.remove('foo');
    assert.equal(stack.length, 2);
  });

  it('first() - adds items to the front of the stack', function () {
    stack.add('two');
    stack.add('three');
    stack.first('one');

    assert.equal(stack.shift(), 'one');
  });

  it('last() - adds items to the end of the stack', function () {
    stack.add('red');
    stack.add(500, 'blue');
    stack.last('green');

    assert.equal(stack.pop(), 'green');
  });

  it('clone() - can clone the stack', function () {
    var clone;

    stack.add('one');
    stack.add('two');
    stack.add('three');

    clone = stack.clone();

    stack.remove('two');
    clone.add('four');

    assert.equal(stack.length, 2);
    assert.equal(clone.length, 4);
  });

  it('can deal with objects in the stack', function () {
    var brian = {
      name: 'Brian',
      handle: 'cpsubrian'
    };
    var carlos = {
      name: 'Carlos',
      handle: 'carlos8f'
    };

    stack.add(brian);
    stack.add(carlos);

    stack.remove(brian);

    assert.equal(stack.length, 1);
    assert.equal(stack.pop(), carlos);
  });

  it('can work with the default property (weight)', function () {
    stack.add({
      name: 'Apple',
      weight: 4
    });
    stack.add({
      name: 'Orange',
      weight: 10
    });
    stack.add({
      name: 'Banana',
      weight: 1
    });

    assert.equal(stack.shift().name, 'Banana');
    assert.equal(stack.shift().name, 'Apple');
    assert.equal(stack.shift().name, 'Orange');
  });

  it('can loop over the items', function () {
    var check = [];

    stack.add(1);
    stack.add(2);
    stack.add(3);

    stack.forEach(function (num) {
      check.push(num);
    });

    assert.deepEqual(check, [1, 2, 3]);
  });

});

