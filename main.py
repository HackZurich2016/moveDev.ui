from flask import Flask
from flask import request
from flask import Response
from flask import render_template
import json

app = Flask(__name__, static_folder='static', static_url_path='')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/bootstrap')
def bootstrap():
    return render_template('bootstrap.html')


@app.route('/login')
def login():
    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)
