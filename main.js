require(['jquery','linkage'], function($,Windower) {
	//
	
	var w = new Windower({
		dom: $('ul.choose select'),
		data: threeSelectData
	})

	console.log(w)
		//
})

