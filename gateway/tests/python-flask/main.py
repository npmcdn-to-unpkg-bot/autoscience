from flask import Flask
import requests

app = Flask(__name__)

# example on how to build an server
# which leverages on jupiter gateway for running kernels

@app.route("/")
def hello():
    r = requests.get('http://localhost:8888/get?a=b&c=23')
    return("Hello World! {}".format(r.text))

if __name__ == "__main__":
    app.run()
