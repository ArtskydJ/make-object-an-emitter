var EventEmitter = require('events').EventEmitter

module.exports = function makeEmitter(fn) {
	var emitter = new EventEmitter()
	Object.keys(EventEmitter.prototype).filter(function(key) {
		return typeof EventEmitter.prototype[key] === 'function'
	}).forEach(function(key) {
		fn[key] = EventEmitter.prototype[key].bind(emitter)
	})
}
