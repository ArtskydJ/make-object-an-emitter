var test = require('tape')
var makeEmitter = require('./index.js')

test('turns a function into an emitter', function (t) {
	t.plan(4)
	var myFnCalled = false
	var eventHappened = false

	var myFn = function () {
		t.notOk(myFnCalled, 'this should be called once')
		myFnCalled = true
	}
	makeEmitter(myFn)
	myFn()
	myFn.on('event', function () {
		t.notOk(eventHappened, 'this should be called once too')
		eventHappened = true
	})
	myFn.emit('event')

	t.ok(myFnCalled, 'should have been called')
	t.ok(eventHappened, 'should have been called')
	t.end()
})

test('two emitters don\'t conflict', function (t) {
	t.plan(1)
	function fn1() { t.pass() }
	function fn2() { t.fail() }
	makeEmitter(fn1)
	makeEmitter(fn2)
	fn1.on('event', fn1)
	fn2.on('event', fn2)
	fn1.emit('event')
	t.end()
})

test('doesn\'t mess with existing properties, for the most part', function (t) {
	t.plan(2)
	var obj = {
		thing: 'I will stay',
		on: 'I will be overwritten'
	}
	makeEmitter(obj)
	obj.on('event', function () {
		t.equal(obj.thing, 'I will stay')
		t.notEqual(obj.on, 'I will be overwritten')
		t.end()
	})
	obj.emit('event')
})
