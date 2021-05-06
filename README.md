# CC Website (Database Project)

This project was developed as project work for college Web technology course.
It is developed in Django Rest Framework and React redux in frontend with following objective.

The portal is being designed college Coding club as a platform to monitor club activities and share their knowledge. Platform consist of dashboard, Blogs and Project sharing. 



Frontend of the code in react is stored in **backend/mysite/frontend/src** folder.

------------




### Steps to run :
- install python 3.6+
- create virtualenv 
`python3 -m venv env`
- activate virtualenv
`source env/bin/activate`
- install dependencies
`pip3 install -r requirements.txt`
- start django server 
```bash
#to build frontend files
install nodejs
cd backend/mysite/frontend
npm build
# to start server
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver 0.0.0.0:8000

```

You can access the website on http://127.0.0.1:8000/ and login with superuser account at http://127.0.0.1:8000/admin .

