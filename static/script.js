document.addEventListener('DOMContentLoaded', function(){
	title_page = document.querySelector('.title_page');
	title_page_sup = document.querySelector('.title_page_sup');

	word_list = document.querySelectorAll('.word_list');	
	
	sub_menu_time_btn = document.querySelectorAll('.sub_menu_time_btn'); // btn_sub_menu
	sub_time_list = document.querySelectorAll('.sub_time_list'); // sub_list

	sub_menu_weather_btn = document.querySelectorAll('.sub_menu_weather_btn'); // btn_sub_menu
	sub_weather_list = document.querySelectorAll('.sub_weather_list'); // sub_list
	
	translation_word = document.querySelectorAll('.russian');
	words = Array.from(translation_word)

	btn_self_testing = document.getElementById('btn_opacity');
	container = document.querySelector('.navigation');
	btn_navigation = container.querySelectorAll('.btn_navigation');

	time_block = document.querySelector('.sub_menu_list');
	btn_sub_menu_time = time_block.querySelectorAll('.sub_menu_time_btn');

	call_nav = document.querySelector('.call_navigation');
	back_pl = document.querySelector('.back_for_menu');	


	btn_self_testing.onclick = function(){
		console.log('click');
		for (let i = 0; i < words.length; i++){
			words[i].classList.toggle('opacity_cl');	
			if (words[i].classList.contains('opacity_cl')){
				btn_self_testing.innerHTML = 'Return translate';
				btn_self_testing.style.backgroundColor = '#6f8';
			} else {
				btn_self_testing.innerHTML = 'Hide translate';
				btn_self_testing.style.backgroundColor = '#5afa';
			}
		}
	}

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




	for (let i = 0; i < sub_menu_time_btn.length; i++){
		sub_menu_time_btn[i].addEventListener('click', function(){
			Remove_active_btn_sub_menu();
			this.classList.add('btn_sub_menu_active');
			Active_list_sub_menu();
			//active_list = document.querySelectorAll('.list_active > li');	
			//console.log(this.value);
			//title_page.innerHTML = this.value + '<sup> ' + active_list.length + ' </sup>';
			active_time_list_sub = document.querySelectorAll('.active_time_sub_list > li');	
			title_page.innerHTML = 'Время '+ '<sup> ' + active_time_list_sub.length + ' </sup>';
		});
	}

	// SUB MENU BTN
	function Remove_active_btn_sub_menu(){
		for(let i=0; i < sub_menu_time_btn.length; i++){
			sub_menu_time_btn[i].classList.remove('btn_sub_menu_active');	
		}
	}

	function Active_list_sub_menu(){
		for(let i = 0; i < sub_time_list.length; i++){
			sub_time_list[i].classList.remove('active_time_sub_list');
			if(sub_menu_time_btn[i].classList.contains('btn_sub_menu_active')){
				sub_time_list[i].classList.add('active_time_sub_list');
			}
		}	
	}




// кнопки погоды
	for (let i = 0; i < sub_menu_weather_btn.length; i++){
		sub_menu_weather_btn[i].addEventListener('click', function(){
			Remove_active_btn_weather_sub_menu();
			this.classList.add('btn_sub_menu_active');
			Active_list_weather_sub_menu();
			//active_list = document.querySelectorAll('.list_active > li');	
			//console.log(this.value);
			//title_page.innerHTML = this.value + '<sup> ' + active_list.length + ' </sup>';
			active_weather_list_sub = document.querySelectorAll('.active_weather_sub_list > li');	
			title_page.innerHTML = 'Погода '+ '<sup> ' + active_weather_list_sub.length + ' </sup>';
		});
	}

	// SUB MENU BTN
	function Remove_active_btn_weather_sub_menu(){
		for(let i=0; i < sub_menu_weather_btn.length; i++){
			sub_menu_weather_btn[i].classList.remove('btn_sub_menu_active');	
		}
	}

	function Active_list_weather_sub_menu(){
		for(let i = 0; i < sub_weather_list.length; i++){
			sub_weather_list[i].classList.remove('active_weather_sub_list');
			if(sub_menu_weather_btn[i].classList.contains('btn_sub_menu_active')){
				sub_weather_list[i].classList.add('active_weather_sub_list');
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




	
});
