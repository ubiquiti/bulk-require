var bulk = require('../');
var test = require('tape');

test('string glob', function (t) {
    t.plan(2);
    
    var res = bulk(__dirname + '/glob', 'render/*.js');
    t.deepEqual(Object.keys(res).sort(), [ 'render' ]);
    t.deepEqual(res.render, { x: { oneoneone: 111, twotwotwo: 222 } } );
});

test('array globs', function (t) {
    t.plan(9);
    
    var res = bulk(__dirname + '/glob', [ 'render/*.js', 'data/**/*.js' ]);
    t.deepEqual(Object.keys(res).sort(), [ 'data', 'render' ]);
    t.deepEqual(res.render, { x: { oneoneone: 111, twotwotwo: 222 } } );
    
    t.equal(typeof res.data.cats, 'function');
    t.equal(res.data.cats, res.data.cats.index);
    t.equal(typeof res.data.dogs, 'function');
    t.equal(res.data.dogs, res.data.dogs.index);
    
    t.deepEqual(res.data.cats.meow, { x: 555 });
    t.equal(res.data.dogs.small.yip(3), 333);
    t.equal(res.data.dogs.wolf.doge, 'wow');
});
