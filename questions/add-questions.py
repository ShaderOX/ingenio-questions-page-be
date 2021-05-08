import json
import requests

with open(r'D:\PROGRAMMING\Nokari\questions-page-backend\questions\db.json', 'r') as f:
    questions = json.load(f)

URL = 'http://localhost:5000/api/questions'
for question in questions.get('questions'):
    question['options'] = [{"value": option.get('value')}
                           for option in question['options']]
    question.pop('id')
    result = requests.post(URL, json=question)

    print(result.status_code)
    print(result.content)
    input(":")
