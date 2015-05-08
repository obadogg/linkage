# linkage
##简介
学习组件编写方式demo----n级联动组件
## 文档结构
* js/res/---------------------资源文件
      * jquery.js
      * reuqire.js------------在工作中没有实际应用过前端模块化开发方式，所以在这个demo中学习一下
      * data.js
* js/class--------------------面向对象用到的依赖模块
      * class.js--------------John Resig的class实现方式
      * Base.js---------------抽象出的Base类，所有组件继承Base
      * Events.js-------------自定义事件模块
* js/app
      * linkage.js------------n级联动组件
* main.js---------------------组件入口<br \>

##data结构
### data文件是一个存储联动数据的对象，数据的结构如下,以三级为例子:
     var data = {
       '第一级': {
           val: '1',
           items: {
               '第二级': {
                   val: '2',
                   items: {
                       '最后一级': '3'
                   }
               }
           }
       }
     }
除了最后一级，每一级都有val和items两个属性;val是值，items存储着下一级的内容，最后一级的值直接为值。

## 使用方式
###调用方式：require  linkage模块后，直接new
    var w = new Windower({
		    dom: $('ul.choose select'),
		    data: threeSelectData,
        //默认数据 第一级 - 第二级 ,'55555'找不到对应值 直接放弃，默认渲染第三级
        defaultData:['1','2','55555']
	 })
dom和data为必传参数。defaultData为默认数据，不是必传参数，default数组对应每级的select。
###观察者模式:
    w.on('change',function(msg){
        console.log(msg[0])
    })
在实例w上监听change事件，msg为传入的数组信息
<br \><br \>
每次select触发change事件，会触发linkage的自定义change事件，传入一个包含当前select信息的数组<br \>
    [当前点击select索引,当前select文本,当前select的值]

##版本
###V1.1
* 功能
    * 任意级联动
    * 本地数据获取
    * 观察者模式
* 以后可能要添加的功能
    * 可以自定义获取数据方式，只需返回一个定义好结构的数组
    * 添加后台手工录入信息模块，方便生成data文件
    
##学习总结
* 通过这个demo的制作，大致学习了前端组件开发的一些规范和方式，我觉得面向对象的开发方式确实能让我们的代码结构更加清晰一点，
维护起来也更加方便。
* 观察者模式降低了代码的耦合度，把一些状态判断的代码分离到了组件外部。
* 前端模块化编程方式确实能让项目中的各种依赖更加清晰，定义、调用也全部在define、require内部实现，避免了全局污染。
