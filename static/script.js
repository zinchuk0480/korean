document.addEventListener('DOMContentLoaded', function(){
	title_page = document.querySelector('.title_page');
	title_page_sup = document.querySelector('.title_page_sup');

	word_list = document.querySelectorAll('.word_list');	
	
	sub_menu_time_btn = document.querySelectorAll('.sub_menu_time_btn'); 
	sub_time_list = document.querySelectorAll('.sub_time_list');

	sub_menu_weather_btn = document.querySelectorAll('.sub_menu_weather_btn');
	sub_weather_list = document.querySelectorAll('.sub_weather_list');
	
	translation_words = document.querySelectorAll('.russian');

	btn_hide_translate = document.getElementById('btn_opacity');
	container = document.querySelector('.navigation');
	btn_navigation = container.querySelectorAll('.btn_navigation');

	time_block = document.querySelector('.sub_menu_list');
	btn_sub_menu_time = time_block.querySelectorAll('.sub_menu_time_btn');

	call_nav = document.querySelector('.call_navigation');
	back_pl = document.querySelector('.back_for_menu');	



	btn_hide_translate.addEventListener('click', () =>{
		for (let i = 0; i < translation_words.length; i++){
			translation_words[i].classList.toggle('opacity_cl');	
			if (translation_words[i].classList.contains('opacity_cl')){
				btn_hide_translate.innerHTML = 'Return translate';
				btn_hide_translate.style.backgroundColor = '#6f8';
			} else {
				btn_hide_translate.innerHTML = 'Hide translate';
				btn_hide_translate.style.backgroundColor = '#5afa';
			}
		}
	})

	btn_nav = Array.from(btn_navigation)
	for (let i = 0; i < btn_nav.length; i++){
		btn_nav[i].addEventListener('click', function(){
			Remove_active_btn();
			this.classList.add('btn_active');
			Active_list();
			active_list = document.querySelectorAll('.list_active > li');	
			console.log(this.value);
			title_page.innerHTML = this.value + '<sup> ' + active_list.length + ' </sup>';
		});
	}

	function Remove_active_btn(){
		for(let i=0; i < btn_navigation.length; i++){
			btn_navigation[i].classList.remove('btn_active');	
		}
	}

	function Active_list(){
		for(let i = 0; i < word_list.length; i++){
			word_list[i].classList.remove('list_active');
			if(btn_nav[i].classList.contains('btn_active')){
				word_list[i].classList.add('list_active');
			}
		}	
	}

// кнопки времени
	for (let i = 0; i < sub_menu_time_btn.length; i++){
		sub_menu_time_btn[i].addEventListener('click', function(){
			Remove_active_btn_sub_menu(sub_menu_time_btn);
			this.classList.add('btn_sub_menu_active');
			Active_list_sub_menu(sub_menu_time_btn, sub_time_list);
			active_time_list_sub = document.querySelectorAll('.sub_time_list.active_sub_list > li');	
			console.log('xxx', active_time_list_sub)
			title_page.innerHTML = 'Время '+ '<sup> ' + active_time_list_sub.length + ' </sup>';
		});
	}


// кнопки погоды
	for (let i = 0; i < sub_menu_weather_btn.length; i++){
		sub_menu_weather_btn[i].addEventListener('click', function(){
			Remove_active_btn_sub_menu(sub_menu_weather_btn);
			this.classList.add('btn_sub_menu_active');
			Active_list_sub_menu(sub_menu_weather_btn, sub_weather_list);
			active_weather_list_sub = document.querySelectorAll('.sub_weather_list.active_sub_list > li');	
			title_page.innerHTML = 'Погода '+ '<sup> ' + active_weather_list_sub.length + ' </sup>';
		});
	}


	// SUB MENU BTN
	function Remove_active_btn_sub_menu(sub_menu_btn){
		for(let i=0; i < sub_menu_btn.length; i++){
			sub_menu_btn[i].classList.remove('btn_sub_menu_active');	
		}
	}

	function Active_list_sub_menu(sub_menu_btn, sub_list){
		for(let i = 0; i < sub_list.length; i++){
			sub_list[i].classList.remove('active_sub_list');
			if(sub_menu_btn[i].classList.contains('btn_sub_menu_active')){
				console.log(sub_list[i])
				sub_list[i].classList.add('active_sub_list');
			} 
		}	
	}



	call_nav.addEventListener('click', function(){
		console.log(pageYOffset);
		console.log(call_nav.clientHeight);
	});

	call_nav.onclick = function(){
		container.classList.toggle('navigation_active');
	//	container.style.top = pageYOffset + 'px';
		call_nav.classList.toggle('call_navigation_after');
		if (call_nav.classList.contains('call_navigation_after')){
			back_pl.style.display = 'block';
		} else {
			back_pl.style.display = 'none';
		}
	}


	list_nav_btn = document.querySelector('.ul_navigation');
	arrow_up = document.querySelector('.arrow_up');
	document.addEventListener('wheel', () =>{
		let scroll_page = pageYOffset;
		let menu_pos = list_nav_btn.clientHeight;
		if (scroll_page > menu_pos){
			arrow_up.classList.add('display_arrow');
		} else {
			arrow_up.classList.remove('display_arrow');
		}
	})


	arrow_up.addEventListener('click', () => {
		if (pageYOffset > 100){
			timer = setInterval(ScrollUp, 10)
		}
	})	

	function ScrollUp(){
		if (pageYOffset < 100){
			clearInterval(timer)
			arrow_up.classList.remove('display_arrow');
		} else {
			window.scrollBy(0, -50)
		}
	}



});
