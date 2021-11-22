document.addEventListener('DOMContentLoaded', function(){
	title_page = document.querySelector('.title_page');
	title_page_sup = document.querySelector('.title_page_sup');

	word_list = document.querySelectorAll('.word_list');	
	

	translation_word = document.querySelectorAll('.russian');
	words = Array.from(translation_word)

	btn_self_testing = document.getElementById('btn_opacity');
	container = document.querySelector('.navigation');
	btn_navigation = container.querySelectorAll('.btn_navigation');

	call_nav = document.querySelector('.call_navigation');
	


	btn_self_testing.onclick = function(){
		console.log('click');
		for (let i = 0; i < words.length; i++){
			words[i].classList.toggle('opacity_cl');	
			if (words[i].classList.contains('opacity_cl')){
				btn_self_testing.innerHTML = 'Return word';
				btn_self_testing.style.backgroundColor = '#6f8';
			} else {
				btn_self_testing.innerHTML = 'Test your self';
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


	call_nav.addEventListener('click', function(){
		console.log(pageYOffset);
		console.log(call_nav.clientHeight);
	});

	call_nav.onclick = function(){
		container.classList.toggle('navigation_active');
	//	container.style.top = pageYOffset + 'px';
		call_nav.classList.toggle('call_navigation_after');
	}

});
