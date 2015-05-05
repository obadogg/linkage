

define(['js/class/class'], function(Class) {

	//基本父类
	var Base = Class.extend({

		init: function(config) {
			this._config = config;

			//子类init
			this._init()
			this.bind()
			this.render()
		},

		set: function(key, value) {

			this._config[key] = value
			return this
		},

		get: function(key) {
			return this._config[key]
		},

		render: function() {},
		bind: function() {},
		_init: function() {},
		destroy: function() {}
	})

	return Base
})