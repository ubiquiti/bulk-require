# bulk-require

require whole directory trees in bulk


# example

``` js
var bulk = require('bulk-require');
var sections = bulk(__dirname, [ 'data/**/*.js', 'render/*.js' ]);
console.log(sections);
```

Running this `glob.js` file in a directory with these contents:

```
data/
  cats/
    index.js
    meow/
      x.js
  dogs/
    index.js
    small/
      yip.js
    wolf/
      doge.js
  owners/
    data.js
glob.js
render/
```

Gives this output:

```
{ data: 
   { cats: { [Function] index: [Circular], meow: [Object] },
     dogs: { [Function] index: [Circular], small: [Object], wolf: [Object] },
     owners: { data: [Object] } },
  render: { x: { oneoneone: 111, twotwotwo: 222 } } }
```

# warning

For applications full of real-world trade-offs and messy business logic
organized into `model/` and `view/` directories  this approach to loading
modules may be justified, but most of the time you should just use the regular
kind of require.

What you should absolutely never do is run this module from somewhere deep in
your codebase. It should be very close to the entry point of your 

Sometimes it's OK to break the rules. Especially if you can get away with it.
Caveat npmtor.

# methods

``` js
var bulk = require('bulk-require')
```

## var modules = bulk(basedir, globs)

Return a nested object `modules` by expanding the string or array of strings
`globs` rooted at the directory `basedir`.

Each file will be placed into the nested tree `modules` based on its filename
with respect to `basedir`. Each directory becomes a new nested object.

# install

With [npm](https://npmjs.org) do:

```
npm install bulk-require
```

# license

MIT
