from flask import Flask, render_template


app = Flask(__name__)


@app.route('/', methods=['GET'])
def hello():
    return render_template('han.html')

@app.route('/rules', methods=['GET'])
def rules():
    return render_template('rules.html')

@app.route('/tables', methods=['GET'])
def tables():
    return render_template('tables.html')

@app.route('/workbook', methods=['GET'])
def workbook_1():
    return render_template('workbook.html')

@app.route('/workbook_2', methods=['GET'])
def workbook_2():
    return render_template('workbook_2.html')

@app.route('/workbook_3', methods=['GET'])
def workbook_3():
    return render_template('workbook_3.html')


@app.route('/book', methods=['GET'])
def book_1():
    return render_template('book_1.html')

@app.route('/book_2', methods=['GET'])
def book_2():
    return render_template('book_2.html')

@app.route('/book_3', methods=['GET'])
def book_3():
    return render_template('book_3.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
    


