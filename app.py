from os import path, walk

from flask import Flask, render_template, redirect, url_for, request, session
from flask_login import LoginManager, current_user, login_required, login_user
#from werkzeug.utils import secure_filename
#from werkzeug.security import check_password_hash, generate_passwoed_hash
from model import query_words


app = Flask(__name__)
app.secret_key = 'dev'
#login_manager = LoginManager(app)


#путь к статике
app_dir = path.dirname(__file__)
words_dir = path.join(app_dir, 'static/words_and_digit/words')
numbers_dir = path.join(app_dir, 'static/words_and_digit/numbers')
words_time_dir = path.join(app_dir, 'static/words_and_digit/words_time')
words_weather_dir = path.join(app_dir, 'static/words_and_digit/words_weather')


def Get_name_files(full_path, sort=True):
	file_names = []
	for _, __, files in walk(full_path):
		for f in files:
			file_names.append(f)
	if sort:
		file_names = sorted(file_names)
	return file_names 

word_file_name = Get_name_files(words_dir)
word_time_file_name = Get_name_files(words_time_dir)
word_weather_file_name = Get_name_files(words_weather_dir)
numb_file_name = Get_name_files(numbers_dir)



# Все файлы
@app.context_processor
def words_list():

	def Colect_all_word(full_path, file_names_arr, sort=True, num=False):
		segment = []
		for file_name in file_names_arr:
			each_file = open(path.join(full_path, file_name), 'r').read()

			words_from_file = []
			for i in each_file.split('\n'):
				if len(i) >= 2:
					words_from_file.append(tuple(i.split('=')))
				if sort:
					words_from_file = sorted(words_from_file, key=lambda x: x[1])
				if num:
					try:
						words_from_file = sorted(words_from_file, key=lambda x: int(float(x[1])))
					except:
						words_from_file = sorted(words_from_file, key=lambda x: x[1])

			segment.append(words_from_file)
		return segment


	segment_wor = Colect_all_word(words_dir, word_file_name)  	
	segment_time_wor = Colect_all_word(words_time_dir, word_time_file_name, False) 
	segment_weather_wor = Colect_all_word(words_weather_dir, word_weather_file_name, False) 
	segment_num = Colect_all_word(numbers_dir, numb_file_name, False, True) 



	def Get_all_words_from_collection(segment):
		all_words = []	
		for i in segment:
			for j in i:
				all_words.append(j)
		
		all_words = sorted(all_words, key=lambda x: x[1])
		return all_words

	all_word = Get_all_words_from_collection(segment_wor)
	all_word_time = Get_all_words_from_collection(segment_time_wor)
	all_word_weather = Get_all_words_from_collection(segment_weather_wor)

	

	def Get_title_from_path_file(full_path):
		category_name = []
		for i in full_path:
			category_name.append(path.splitext(i)[0])
		return category_name	

	category_name = Get_title_from_path_file(word_file_name)
	category_name_time = Get_title_from_path_file(word_time_file_name)
	category_name_weather = Get_title_from_path_file(word_weather_file_name)
	category_name_number = Get_title_from_path_file(numb_file_name)


	return dict(words = (
								all_word, 
								segment_wor, 
								category_name, 
								segment_num, 
								category_name_number, 
								segment_time_wor, 
								category_name_time, 
								all_word_time,
								category_name_weather, 
								all_word_weather,
								segment_weather_wor 
							)
						)



@app.route('/', methods=['GET'])
def main_paige():
    return render_template('words.html')

@app.route('/tables', methods=['GET'])
def table():
    return render_template('tables.html')

@app.route('/keyboard', methods=['GET'])
def keyboard():
    return render_template('keyboard.html')

@app.route('/rules', methods=['GET'])
def rules():
	return render_template('rules.html')




@app.context_processor
def all_json():
    def get_json():
        data = query_words()
        return data
    return dict(jso = get_json())





if __name__ == '__main__':
    app.run(host='0.0.0.0')
