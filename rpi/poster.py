import requests
import Adafruit_DHT as dht

# url = 'http://31.14.131.42:3111/api/logs/post'
url = 'http://localhost:3111/api/logs/post'
pin = 4

h,t = dht.read_retry(dht.DHT11, pin)

if h is not None and t is not None:
    print('temp={0:0.1f}*C  humidity={1:0.1f}%'.format(t, h))
else:
    print('something went wrong')

res = requests.post(url, json={
                                "temperature": t, 
                                "humidity": h
                              })
print(res.text)
