define(['js/class/Base'], function(Base) {
	//
	var Windower = Base.extend({

		//初始化，init继承于Base类，若子类不用自己的初始化自己成员，则不用重写_init,
		//就是说init够用，则不用重写_init
		_init: function() {

			var //数据
				data = this.get('data'),
				//dom元素数组化
				dom = Array.prototype.slice.call(this.get('dom'))

			this.set('dom', dom)
				//存储用于拼装html的数组
			this.htmlData = []
				//存储用于渲染到页面的数据的数组
			this.renderData = []
				//当前选中select
			this.selectIndex = -1
				//是否可以点击
			this.canClick = true
				//时间戳，若联动很多，处理超过
			this.timeThen = 0
				//第一次进来
			this.firstTime = true
		},

		//事件函数
		_handle: function() {

			this.timeThen = Date.now()
				//清空后续select
			this._empty()
				//获取optionhtml
			// this.htmlData.push(this._readData())
			this._readData()
		},

		//自定义获取数据
		_userHandle:function(){

		},

		//置空select
		_empty: function() {
			var dom = this.get('dom'),
				//当前select索引
				num = this.selectIndex

			if (num > dom.length) return false

			$.each(dom, function(k, v) {
				if (k > num) {
					$(v).html('')
				}
			})

			return this
		},

		//读取数据用于拼装html
		_readData: function(defaultData) {
			
			var
			//当前select索引
				num = this.selectIndex,

				originalData = this.get('data'),
				dom = this.get('dom'),

				domArr = [],
				self = this,

				//是否有默认项
				hasData = Object.prototype.toString.call(defaultData).toLowerCase() === '[object array]'
			//如果defaultData不存在或者为false,把点击的select和他前边的值推入数组domArr
			if (!defaultData) {

				for (var i = 0; i <= num; i++) {

					domArr.push($(dom[i]).val())
				}
			}

			//根据前边select的值遍历出后边含有后边值的对象
			var frontInfo = frontLoop(domArr)

			// this._groupHtml(frontInfo)
			//遍历当前select后边对象取出用到的字符串的值
			backLoop(frontInfo)

			//拼装html
			this._groupHtml()

			//循环遍历
			function frontLoop(arr) {

				//如果第一级都没点过，则直接返回原始数据
				if (arr.length === 0) {

					return originalData
				}

				var num = 0,
					val_1 = arr[num],
					cache

				//递归函数
				function doit(data, val) {

					$.each(data, function(k, v) {

						if (v.val == val && num < arr.length - 1) {

							doit(v.items, arr[++num])
							return
						}
						//选中的select
						if ((v.val == val || v == val) && num == arr.length - 1) {

							v.items ? cache = v.items : cache = v
							return
						}

					})

				}

				doit(originalData, val_1)
				return cache
			}

			//后递归遍历
			function backLoop(data) {
				
				if(typeof data != 'object'){
					// console.log(self.htmlData)
					return
				}
				console.log(data)
				// alert(1111)
				var cache = [],
					//元素对象深度
					dataDepath = 1,
					//赋值
					value

				function doit(doitData) {
					//置空key
					var key = null,
						//传入数组第一项数值
						firstValue = hasData && defaultData.length > 0 ? defaultData.shift() : null

					$.each(doitData, function(k, v) {

						//遍历val是否存在
						// if( (v.val || v.val == '') && v.items){
						// 	//是否有默认选项
						// 	if( hasData && v.val == firstValue){
								
						// 		key = k

						// 		cache.push(k + ':' + v.val + ':' + 'selected')
						// 	}else{

						// 		cache.push(k + ':' + v.val )
						// 	}

						// 	//深度是否到底
						// 	dataDepath = 1
						// }else{

						// 	//是否有默认选项
						// 	if( hasData && v == firstValue){

						// 		key = k
						// 		cache.push(k + ':' + v + ':' + 'selected')
						// 	}else{

						// 		cache.push(k + ':' + v )
						// 	}

						// 	//深度是否到底
						// 	dataDepath = 0
						// }
						//是否是doitData的最后一层
						( v.val || v.val == '' ) && v.items ? (value = v.val,dataDepath = 1) : (value = v,dataDepath = 0)

						//是有默认项
						if( hasData && value == firstValue ){
							//key等于选中的键名
							key = k
							cache.push(k + ':' + value + ':' + 'selected')

						}else{

							cache.push(k + ':' + value )

						}
					})
					
					self.htmlData.push(cache)
						//每一个select的数组
					cache = []
						//如果遍历到最后一项
					if (dataDepath) {
						
						//选择第一项继续遍历
						key ? void 0 : key = self.htmlData[self.htmlData.length - 1][0].split(':')[0]
			
						doit(doitData[key].items)

					}
				}
				doit(data)
			}

		},
		//拼装html
		_groupHtml: function() {

			var dom = this.get('dom'),
				//当前select索引
				num = this.selectIndex,
				//存着数据的数组
				data = this.htmlData,

				render = this.renderData,
				//html字符串
				str = ''


			if (num >= dom.length) return false

			var len = data.length


			for (var i = 0; i < len; i++) {
				// console.log(data)
				var headData = data.shift()

				for (var k = 0; k < headData.length; k++) {

					var arr        = headData[k].split(':'),
						key        = arr[0],
						val        = arr[1],
						isSelected = arr[2]

					isSelected ? str += '<option value="' + val + '" selected="selected">' + key + '</option>' : str += '<option value="' + val + '">' + key + '</option>'
				}

				//把html字符串推入数组
				render.push(str)
				// console.log(render)
				//制空
				str = ''
			}

			//渲染到页面
			this.render()
		},
		//渲染页面
		render: function() {
			//初始化,没有数据---不能这么判断，如果数组没数据可能不只是初始进来，也可能是末尾项选择
			if (this.renderData.length === 0 && this.firstTime) {
				//判断是否有初始化数据
				var defaultData = this.get('defaultData')
				defaultData ? this._readData(defaultData) : this._readData(true)
				//初始化完成后firstTime 设置成false
				this.firstTime = false
					// }
				return
			}

			//渲染到html
			var
				render = this.renderData,
				index = this.selectIndex,
				dom = this.get('dom'),
				allNum = dom.length,
				i = 0,
				len = allNum - index - 1

			for (; i < len; i++) {

				$(dom[i + index + 1]).html(render.shift())
			}

			//一次操作完成，渲染完页面后设置值
			this.canClick = true
			console.log(Date.now() - this.timeThen)
		},
		//绑定事件
		bind: function() {

			var dom = Array.prototype.slice.call(this.get('dom')),
				self = this

			for (var i = 0; i < dom.length; i++) {

				(function(k) {
					$(dom[k]).on('change', function() {
						//当前select索引
						self.selectIndex = k
						//添加自定义获取数据方式--返回数组
						if( typeof self.get('handle') == 'function'){
							self['_userHandle']()
						}else{
							self['_handle']()
						}
					})

				})(i)

			}
		}
	})
		
	//
	return Windower
})


