var fs = require('fs');
var glob = require('glob');
var path = require('path');

module.exports = function (root, globs, bounds) {
    if (typeof globs === 'string') globs = [ globs ];
    
    var files;
    if (Array.isArray(globs)) {
        files = globs.reduce(function (acc, g) {
            var ex = glob.sync(g);
            ex.forEach(function (rel) {
                var file = path.join(root, rel);
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
        }, {});
    }
    else if (globs && typeof globs === 'object') {
        files = Object.keys(globs).reduce(function (acc, key) {
            var ex = glob.sync(globs[key]);
            acc[key] = ex.reduce(function (bcc, k) {
                var bk = path.basename(k).replace(/\.[^.]*$/, '');
                bcc[bk] = path.join(root, k);
                return bcc;
            }, {});
            return acc;
        }, {});
    }
    else return {};
    
    return walk(files);
    
    function walk (node) {
        if (typeof node === 'object') {
            return Object.keys(node).reduce(function (acc, key) {
                acc[key] = walk(node[key]);
                return acc;
            }, {});
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
