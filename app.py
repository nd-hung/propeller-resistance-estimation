#!/usr/bin/env python3
import json
import numpy as np
import os
from flask import Flask, render_template, request, redirect, flash

# Set path to static data in the app
__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))

DEVELOPMENT_ENV = False

app = Flask(__name__)
app.config['TESTING'] = True
app.config.update(
    TESTING=True,
    SECRET_KEY='hungwebapp2024'
)


app_data = {
    "name": "Ship propeller resistance estimation system",
    "description": "Flask app",
    "author": "Hung Nguyen",
    "html_title":"",
    "project_name": "",
    "keywords": "Ship building, Machine learning, Flask",
}

@app.route("/", methods=['GET', 'POST'])
def home():
    return render_template("index.html", app_data=app_data)

@app.route("/about")
def about():
    return render_template("about.html", app_data=app_data)

if __name__ == "__main__":
    app.run(debug=DEVELOPMENT_ENV)
