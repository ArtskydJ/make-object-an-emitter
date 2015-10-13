make-object-an-emitter
======================

> Turns an object into a node emitter.

[![Build Status](https://travis-ci.org/ArtskydJ/make-object-an-emitter.svg)](https://travis-ci.org/ArtskydJ/make-object-an-emitter)

# Example

```js
var makeEmitter = require('make-object-an-emitter')

function myFn () {
	console.log('I am a function...')
}
makeEmitter(myFn)

myFn()
myFn.on('event', function () {
	console.log('...But I am also an event emitter!!!')
})
```

# API

```js
var makeEmitter = require('make-object-an-emitter')
```

## `makeEmitter(obj)`

`makeEmitter` mutates `obj` (an object/function), that will be turned into an event emitter. Existing properties that don't conflict with event emitter properties will be left on the object.

# License

[MIT](http://opensource.org/licenses/mit)
