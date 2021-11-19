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


word_file_name = []
for _, __, files in walk(words_dir):
	for f in files:
		word_file_name.append(f)

numb_file_name = []
for _, __, files in walk(numbers_dir):
	for n in files:
		numb_file_name.append(n)


# Все файлы
@app.context_processor
def words_list():
	wor = []
	for file_name in word_file_name:
		each_file = open(path.join(words_dir, file_name), 'r').read()

		for i in each_file.split('\n'):
			if len(i) >= 2:
				wor.append(tuple(i.split('=')))

	wor = sorted(wor, key=lambda x: x[1])

	return dict(words = wor)


@app.route('/', methods=['GET'])
def main_paige():
    return render_template('main_page.html')



if __name__ == '__main__':
    app.run(host='0.0.0.0')
