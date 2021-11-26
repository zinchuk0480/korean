tinput = document.getElementById('tinput');
tarea = document.getElementById('tarea');


list_keys = {
	KeyQ: document.getElementById('key_q'),
	KeyW: document.getElementById('key_w'),
	KeyE: document.getElementById('key_e'),
	KeyR: document.getElementById('key_r'),
	KeyT: document.getElementById('key_t'),
	KeyY: document.getElementById('key_y'),
	KeyU: document.getElementById('key_u'),
	KeyI: document.getElementById('key_i'),
	KeyO: document.getElementById('key_o'),
	KeyP: document.getElementById('key_p'),
	BracketLeft: document.getElementById('key_br_left'),
	BracketRight: document.getElementById('key_br_right'),
	KeyA: document.getElementById('key_a'),
	KeyS: document.getElementById('key_s'),
	KeyD: document.getElementById('key_d'),
	KeyF: document.getElementById('key_f'),
	KeyG: document.getElementById('key_g'),
	KeyH: document.getElementById('key_h'),
	KeyJ: document.getElementById('key_j'),
	KeyK: document.getElementById('key_k'),
	KeyL: document.getElementById('key_l'),
	Semicolon: document.getElementById('key_semicolon'),
	Quote: document.getElementById('key_quote'),
	KeyZ: document.getElementById('key_z'),
	KeyX: document.getElementById('key_x'),
	KeyC: document.getElementById('key_c'),
	KeyV: document.getElementById('key_v'),
	KeyB: document.getElementById('key_b'),
	KeyN: document.getElementById('key_n'),
	KeyM: document.getElementById('key_m'),
	Comma: document.getElementById('key_coma'),
	Period: document.getElementById('key_period'),
	Slash: document.getElementById('key_slash'),
	Space: document.getElementById('key_space'),
	ShiftLeft: document.getElementById('key_shift_left'),
	ShiftRight: document.getElementById('key_shift_right'),
}

string = ['배고픈', '여우',  '한', '마리가',  '포도밭', '옆을', '지나가게', '되었어요']
for (let i = 0; i < string.length; i++){
	tinput.innerHTML += "<span class='test_word'>" + string[i] + "</span>" + ' ';
}

test_word = document.querySelectorAll('.test_word');
test_word = Array.from(test_word);

old_tarea = tarea.value


document.addEventListener('keydown', function(event){
	if (event.code in list_keys){
		list_keys[event.code].style.backgroundColor = '#18e0cc';
	}

	if (event.code == 'Space' && tarea.value[tarea.value.length - 1] != ' '){
		old_tarea = tarea.value;
		user_input = tarea.value.split(' ');

		let errors = 0;
		for (let i = 0; i < user_input.length; i++){
			if (user_input[i] == string[i]){
				test_word[i].classList.add('good');
			} else {
				test_word[i].classList.add('not_good');
				errors += 1
			}
		errors_counter = document.getElementById('errors');
		errors_counter.innerHTML = errors;
		}
	}else if (event.code == 'Space' && tarea.value[tarea.value.length - 1] == ' ')  {
		tarea.value = old_tarea;
	}else if (event.code == 'Backspace' && tarea.value[tarea.value.length - 1] == ' '){
		tarea.value = old_tarea;
	}else{
		old_tarea = tarea.value;
	}
})


document.addEventListener('keyup', function(event){
	if (event.code in list_keys){
		list_keys[event.code].style.backgroundColor = '#e0fffc';
	}
})



Date.prototype.this_mont_day = function(){
	return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
}
console.log(new Date().this_mont_day());
