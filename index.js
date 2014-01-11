var glob = require('glob');
var path = require('path');

module.exports = function (root, globs, bounds) {
    if (typeof globs === 'string') globs = [ globs ];
    if (!Array.isArray(globs)) return {};
    var xglobs = globs.map(function (g) { return path.resolve(root, g) });
    
    return walk(xglobs.reduce(function (acc, g) {
        var ex = glob.sync(g);
        ex.forEach(function (file) {
            var keys = keyOf(file);
            for (var node = acc, i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (i === keys.length - 1) {
                    node[keys[i]] = file;
                }
                else {
                    if (!node[key]) node[key] = {};
                    node = node[key];
                }
            }
        });
        return acc;
    }, {}));
    
    function walk (node) {
        if (typeof node === 'object') {
            return Object.keys(node).reduce(function (acc, key) {
                acc[key] = walk(node[key]);
                return acc;
            }, typeof node.index === 'string' ? require(node.index) : {});
        }
        else return require(node);
    }
    
    function keyOf (file) {
        var parts = path.relative(root, file).split('/');
        var len = parts.length;
        if (len) parts[len-1] = parts[len-1].replace(/\.[^.]*$/, '');
        return parts;
    }
};
