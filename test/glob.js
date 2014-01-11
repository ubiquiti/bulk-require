var bulk = require('../');
var test = require('tape');

test('string glob', function (t) {
    t.plan(5);
    
    var sections = bulk(__dirname + '/glob', 'render/*.js');
    t.deepEqual(Object.keys(sections).sort(), [ 'render' ]);
    t.deepEqual(Object.keys(sections.render).sort(), [ 'x' ]);
    t.deepEqual(
        Object.keys(sections.render.x).sort(),
        [ 'oneoneone', 'twotwotwo' ]
    );
    t.equal(sections.render.x.oneoneone, 111);
    t.equal(sections.render.x.twotwotwo, 222);
});
