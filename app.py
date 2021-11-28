from os import path, walk

from flask import Flask, render_template, redirect, url_for, request, session
from flask_login import LoginManager, current_user, login_required, login_user
#from werkzeug.utils import secure_filename
#from werkzeug.security import check_password_hash, generate_passwoed_hash


app = Flask(__name__)
app.secret_key = 'dev'
#login_manager = LoginManager(app)


#путь к статике
app_dir = path.dirname(__file__)
words_dir = path.join(app_dir, 'static/words_and_digit/words')
numbers_dir = path.join(app_dir, 'static/words_and_digit/numbers')
words_time_dir = path.join(app_dir, 'static/words_and_digit/words_time')


word_file_name = []
for _, __, files in walk(words_dir):
	for f in files:
		word_file_name.append(f)
word_file_name = sorted(word_file_name)

word_time_file_name = []
for _, __, files in walk(words_time_dir):
	for f in files:
		word_time_file_name.append(f)
word_time_file_name = sorted(word_time_file_name)

numb_file_name = []
for _, __, files in walk(numbers_dir):
	for n in files:
		numb_file_name.append(n)
numb_file_name = sorted(numb_file_name)



# Все файлы
@app.context_processor
def words_list():

	segment_num = []
	for file_name in numb_file_name:
		each_file_num = open(path.join(numbers_dir, file_name), 'r').read()

		num = []
		for i in each_file_num.split('\n'):
			if len(i) >= 2:
				num.append(tuple(i.split('=')))
			try:
				num = sorted(num, key=lambda x: int(float(x[1])))
			except:
				num = sorted(num, key=lambda x: x[1])
		segment_num.append(num)	



	segment_time_wor = []
	for file_name in word_time_file_name:
		each_file = open(path.join(words_time_dir, file_name), 'r').read()

		wor_time = []
		for i in each_file.split('\n'):
			if len(i) >= 2:
				wor_time.append(tuple(i.split('=')))
		segment_time_wor.append(wor_time)



	segment_wor = []
	for file_name in word_file_name:
		each_file = open(path.join(words_dir, file_name), 'r').read()

		wor = []
		for i in each_file.split('\n'):
			if len(i) >= 2:
				wor.append(tuple(i.split('=')))
			wor = sorted(wor, key=lambda x: x[1])
		segment_wor.append(wor)
		

	all_word = []	
	for i in segment_wor:
		for j in i:
			all_word.append(j)
	
	all_word = sorted(all_word, key=lambda x: x[1])


	all_word_time = []	
	for i in segment_time_wor:
		for j in i:
			all_word_time.append(j)
	
	all_word_time = sorted(all_word_time, key=lambda x: x[1])


	category_name = []
	for i in word_file_name:
		category_name.append(path.splitext(i)[0])


	category_name_time = []
	for i in word_time_file_name:
		category_name_time.append(path.splitext(i)[0])


	category_name_number = []
	for i in numb_file_name:
		category_name_number.append(path.splitext(i)[0])


	return dict(words = (
								all_word, 
								segment_wor, 
								category_name, 
								segment_num, 
								category_name_number, 
								segment_time_wor, 
								category_name_time, 
								all_word_time
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

if __name__ == '__main__':
    app.run(host='0.0.0.0')
