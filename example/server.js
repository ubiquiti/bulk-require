var freight = require('../');
var sections = freight(__dirname, [ 'data/**/*.js', 'render/*.js' ]);
console.log(sections);
