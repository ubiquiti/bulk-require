var test = require('tape');
var bulk = require('../');

test('bound arguments', function (t) {
    t.plan(5);
   
    var res = bulk(__dirname + '/args', {
        '**/*.js': [],
        '**/data.js': [ function (n) { return n * 111 } ]
    });
    
    t.equal(res.beep, 'boop');
    t.equal(res.y.one(), 111);
    t.equal(res.y.two(), 222);
    t.equal(res.y.n(3), 333);
    t.equal(res.x(), 999);
});
