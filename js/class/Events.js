define(['js/class/class'], function(Class) {
    var index = function(arr, key) {

        if (arr === null || arr === 'undefined') {

            return -1
        }
        var
            i = 0,
            len = arr.length

        for (; i < len; i++) {

            //如果传入匿名函数，将比较不出来，即使这两个匿名函数一摸一样
            if (arr[i] === key) {

                return i
            }
        }
        return -1
    }

    var Events = {

        on: function(key, listener) {

            if (this._events == null) {
                this._events = {}
            }
            console.log(this._events)
            if (this._events[key] == null) {
                this._events[key] = []
            }
            console.log(11111)
            if (index(this._events[key], listener) == -1 && typeof listener == 'function') {

                this._events[key].push(listener)
            }

            return this
        },

        fire: function(key) {

            if (!this._events || !this._events[key]) {
                return false
            }


            var arr = Array.prototype.slice.call(arguments, 1) || []
            console.log(arr)
            var i = 0,
                len = arr.length

            for (; i < len; i++) {

                this._events[key][i].call(this, arr[i])
            }
            // this._events[key][i].call(this,arr)

            return this
        },
        //要删除指定的监听函数必须传入有名函数（匿名函数不行）
        off: function(key, listener) {

            if (!this._events || !this._events[key]) {
                return false
            }

            //如果传入的只有key,将删除所有挂在在key上的事件函数
            if (key && !listener) {

                delete this._events[key]
            }
            //删除指定事件，必须传入有名函数，因为index函数比较不出来匿名函数是否相同
            if (key && listener) {

                var position = index(this._events[key], listener)
                if (position > -1) {

                    //删除传入的listener
                    this._events[key].splice(position, 1)
                } else {
                    //如果传入的是匿名函数或者传入的有名函数没有在events[key]数组里
                    //暂时埋个坑，暂时不处理

                }
            }

            return this
        }

    }

    return Events
})