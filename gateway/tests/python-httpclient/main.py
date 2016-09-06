import requests

r = requests.get('http://localhost:8888/echo')
print(r.text)

r = requests.get('http://localhost:8888/get?a=b&c=23')
print(r.text)

r = requests.get('http://localhost:8888/json')
print(r.text)
print(r.headers)

r = requests.post('http://localhost:8888/post', data = {'key':'value'})
print(r.text)
