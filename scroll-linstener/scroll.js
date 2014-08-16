function scrollListen(nav, con){
	var nav = $(nav);
	var con = $(con);

	var navItem = nav.children();
	var conItem = con.children();

	var conH = con.height();
	var navH = nav.height();
	var navItemH = navItem.eq(0).height();
	var conTop = con.offset().top;
	var navPos = conTop + conH - navH;

	var wScroll, index;

	// 点击导航栏跳转到相应的内容块
	navItem.click(function(index){
		index = $(this).index();
		_scrollTop = conItem.eq(index).offset().top;
		$('html, body').animate({scrollTop: _scrollTop}, "fast");
	})

	// 设置导航栏的位置高度
	function setPos(positionVal, topVal){
		nav.css({
			position: positionVal,
			top: topVal
		})
	}

	$(window).scroll(function(){
		//当con的scrollTop小于0时固定nav的位置
		wScroll = $(this).scrollTop();
		$(document)[0].title = wScroll;

		// if(wScroll >= conTop && wScroll <= navPos){
		// 	setPos('fixed', 0);
		// }else if(wScroll < conTop){
		// 	setPos('absolute', conTop)
		// }else if(wScroll >= navPos){
		// 	setPos('absolute', navPos)
		// };

		switch(true){
			case wScroll < conTop:
				setPos('absolute', conTop);
				break;

			case wScroll >= conTop && wScroll <= navPos:
				setPos('fixed', 0);
				break;

			case wScroll >= navPos:
				setPos('absolute', navPos);
				break;
		};

		conItem.each(function(index){
			_h = wScroll + navItemH*(index+1) - $(this).offset().top;
			if(_h >=0){
				navItem.eq(index).addClass('cur')
					.siblings().removeClass('cur');
			};
		})


	})
}