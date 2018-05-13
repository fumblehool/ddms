# DDMS

Daman Document Management System. A web app which helps manage user's documents.

# Stacks Used

**Python 3.5.2**: Python version used.

**Django**: Framework used for back-end.

**React.js**: Framework used to create the web-app.

**bootstrap**: I have used bootstrap to make this web-app responsive.

**react-router**: Routing Library used.

**webpack**: Bundling tool used.

**sqlite3**: Database.

**Virtualenv**: virtualenv development environment used.

**Ubuntu 16.04**: OS used for development.


# Steps for Installation -:

1) Clone this repository

    ```$ git clone https://github.com/fumblehool/ddms.git```

2) Goto Project directory

    ```$ cd ddms```

3) Setup Front-end. Note: npm or yarn is required for this step.

    ```$ npm install``` or
    ```$ yarn install```

4) Build using webpack.

    ```$ npm run build``` or
    ```$ yarn run build```

5) Setup Back-end. Note: python 3 and python-pip is required for this step.

	Setup virtualenv:
    ```$virtualenv -p python3 venv```

6) Activate the virtualenv.

    ```$source venv/bin/activate```

7) Install Django and other packages.

    ```$pip install -r requirements.txt```

8) Setup custom domain.

    ```$sudo echo "127.0.0.1   dev.ddms.com" | sudo tee --append /etc/hosts```

9) Run django server.

    ```$python ddms/manage.py runserver```

10) Open ```http://dev.ddms.com:8000/docs/``` in browser.

    Use Following credentials:
 
      	username: daman
        
        password: damanpreet
         
    Or Register new user.