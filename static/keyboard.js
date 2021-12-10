document.addEventListener('DOMContentLoaded', () =>{
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

hanguil_list = {
	'ㅂ': document.getElementById('key_q'),
	'ㅃ': document.getElementById('key_q'),
	'ㅈ': document.getElementById('key_w'),
	'ㅉ': document.getElementById('key_w'),
	'ㄷ': document.getElementById('key_e'),
	'ㄸ': document.getElementById('key_e'),
	'ㄱ': document.getElementById('key_r'),
	'ㄲ': document.getElementById('key_r'),
	'ㅅ': document.getElementById('key_t'),
	'ㅆ': document.getElementById('key_t'),
	'ㅛ': document.getElementById('key_y'),
	'ㅕ': document.getElementById('key_u'),
	'ㅑ': document.getElementById('key_i'),
	'ㅐ': document.getElementById('key_o'),
	'ㅔ': document.getElementById('key_p'),
	'ㅁ': document.getElementById('key_a'),
	'ㄴ': document.getElementById('key_s'),
	'ㅇ': document.getElementById('key_d'),
	'ㄹ': document.getElementById('key_f'),
	'ㅎ': document.getElementById('key_g'),
	'ㅗ': document.getElementById('key_h'),
	'ㅓ': document.getElementById('key_j'),
	'ㅏ': document.getElementById('key_k'),
	'ㅣ': document.getElementById('key_l'),
	'ㅋ': document.getElementById('key_z'),
	'ㅌ': document.getElementById('key_x'),
	'ㅊ': document.getElementById('key_c'),
	'ㅍ': document.getElementById('key_v'),
	'ㅠ': document.getElementById('key_b'),
	'ㅜ': document.getElementById('key_n'),
	'ㅡ': document.getElementById('key_m'),
	' ': document.getElementById('key_space'),
	'ShiftLeft': document.getElementById('key_shift_left'),
	'ShiftRight': document.getElementById('key_shift_right'),
}

const right_shift_symbols = ['ㅃ','ㅉ','ㄸ','ㄲ','ㅆ']
const left_shift_symbols = ['ㅒ','ㅖ']

string = ['ㄱ','배고픈', '여우',  '한', '마리가',  '포도밭', '옆을', '지나가게', '되었어요']
for (let i = 0; i < string.length; i++){
	tinput.innerHTML += "<span class='test_word'>" + string[i] + "</span>" + ' ';
}

decompos_string = []
for (let i = 0; i < string.length; i++) {
	let new_string = ''
	for (let j = 0; j < string[i].length; j++) {
		if (string[i][j] in hangul_decompos){
			new_string += string[i][j].replace(string[i][j], hangul_decompos[string[i][j]])
		} else {
			new_string += string[i][j] 
		}
	}
	decompos_string.push(new_string)
}

console.log('deco ', decompos_string)

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

console.log(hanguil_list['ㄹ'])
function clearColorKeys(){
	for (key in hanguil_list) {
		hanguil_list[key].style.backgroundColor = "#e0fffc"
	}
}
document.addEventListener('keyup', function(event){
	if (event.code in list_keys){
		clearColorKeys()
		list_keys[event.code].style.backgroundColor = '#e0fffc';
		let decompos_tarea = decomposHangul()
		hlsNextLetter(decompos_tarea)
	} else {
		clearColorKeys()
		decompos_tarea = decomposHangul()
		hlsNextLetter(decompos_tarea)
	}
})

function decomposHangul(){
	string_taria_array = tarea.value.split(' ')

	decompos_tarea = []
	for (let i = 0; i < string_taria_array.length; i++) {
		let tarea_string = ''
		for (let j = 0; j < string_taria_array[i].length; j++) {
			if (string_taria_array[i][j] in hangul_decompos){
				tarea_string += string_taria_array[i][j].replace(string_taria_array[i][j], hangul_decompos[string_taria_array[i][j]])
			} else {
				tarea_string += string_taria_array[i][j] 
			}
		}
		decompos_tarea.push(tarea_string)
	}
	return decompos_tarea
}

function hlsNextLetter(decompos_tarea){
	length_after_last_space = decompos_tarea[decompos_tarea.length - 1].length
	console.log('length_after_last_space ', length_after_last_space) 
	index_word = tarea.value.split(' ').length - 1;
	letter_word = decompos_string[index_word][length_after_last_space]

	if (letter_word == undefined){
		hanguil_list[' '].style.backgroundColor = '#00ff04';
	}	else { 
		if (right_shift_symbols.includes(letter_word)){
			hanguil_list['ShiftRight'].style.backgroundColor = '#00ff04';			
		}
		hanguil_list[letter_word].style.backgroundColor = '#00ff04';
	}
}
hlsNextLetter(decomposHangul())




console.log(hangul_decompos)


Date.prototype.this_mont_day = function(){
	return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
}
console.log(new Date().this_mont_day());


});
