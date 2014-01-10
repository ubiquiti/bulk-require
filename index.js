var fs = require('fs');
var glob = require('glob');
var path = require('path');

module.exports = function (root, globs) {
    if (typeof globs === 'string') globs = [ globs ];
    
    var files;
    if (Array.isArray(globs)) {
        files = globs.reduce(function (acc, g) {
            var ex = glob.sync(g);
            ex.forEach(function (rel) {
                var file = path.join(root, rel);
                acc[keyOf(file)] = file;
            });
            return acc;
        }, {});
    }
    
    return Object.keys(files).reduce(function (acc, key) {
        acc[key] = require(files[key]);
        return acc;
    }, {});
    
    function keyOf (file) {
        var parts = path.relative(root, file).split('/');
        return parts.slice(0, -1);
    }
};
