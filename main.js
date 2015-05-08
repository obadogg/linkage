require(['js/app/linkage'], function(Windower) {
	//
	
	var w = new Windower({
		dom: $('ul.choose select'),
		data: threeSelectData,
        //默认数据 天津 - 市辖区 ,'3'找不到对应值 直接放弃
        defaultData:['2','2','3']
	})

    console.log(w)
    w.on('change',function(msg){
        if( msg[0] == 0 && msg[1] == '河北省'){
            alert('我籍贯这里的')
        }
        if( msg[0] == 0 && msg[1] == '北京市'){
            alert('这是我第二个家乡')
        }
    })
})

