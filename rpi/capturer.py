import requests
import cv2
import base64

# url = 'http://31.14.131.42:3111/api/frames/post'
url = 'http://31.14.131.42:3111/api/frames/post'
webcam = cv2.VideoCapture(0)

if not webcam.isOpened():
    raise Exception("something went wrong when opening webcam")

ret, img = webcam.read()

ret, buffer = cv2.imencode('.jpg', img)
cv2.imwrite('temp.jpg', img)
webcam.release()

frame_file = open('temp.jpg', 'rb')
base64_encoded_image = base64.b64encode(frame_file.read())
print(base64_encoded_image)

res = requests.post(url, json={
                                "base64": str(base64_encoded_image)
                              })

print(res.text)
