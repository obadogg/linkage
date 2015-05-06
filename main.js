require(['js/app/linkage'], function(Windower) {
	//
	
	var w = new Windower({
		dom: $('ul.choose select'),
		data: threeSelectData,
        //默认数据 天津 - 市辖区 ,'3'找不到对应值 直接放弃
        defaultData:['2','2','3']
	})
    
})

