from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_plot', methods=['POST'])
def update_plot():
    # Retrieve parameters from AJAX request
    params = request.json
    a = float(params['a'])
    b = float(params['b'])
    c = float(params['c'])
    d = float(params['d'])

    # Generate x values and calculate corresponding y values for f(x)
    x_values = list(np.linspace(-10, 10, 100))
    y_values = [a * x**3 + b * x**2 + c * x + d for x in x_values]

    # Return x and y values as JSON
    return jsonify({'x_values': x_values, 'y_values': y_values})


@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == '__main__':
    app.run(debug=True)
