from flask import Flask, jsonify, request
import os
import pymysql
from pymysql.cursors import DictCursor
from utils.bcrypt import checkBcrypt
from utils.create_jwt import createJWT
import jwt

from functools import wraps

app = Flask(__name__)

db = pymysql.connect(
    host = os.environ.get('DB_HOST'),
    user = os.environ.get('DB_USER'),
    password = os.environ.get('DB_PASSWORD'),
    database= os.environ.get('DB_NAME'),
    cursorclass = DictCursor
)

# Middleware para comprobar token en rutas privadas
# La función comprueba que se envíe a través de los headers
# un token y que este coincida con el que hay en .ENV
def private_route_middleware(f):
    @wraps(f)
    def check(*args, **kwargs):
        token = request.headers.get('Authorization')
        if token == os.environ.get('PRIVATE_TOKEN'):
            return f(*args, **kwargs)
        else:
            return jsonify({'message': 'Unauthorised'}), 401


    return check

# Users API Routes
@app.route('/auth/login', methods=["POST"])
def login():
    try:
        if request.method == 'POST':
            data = request.json
            email = data.get('email')
            password = data.get('password')

            cursor = db.cursor()
            cursor.execute("SELECT * FROM Usuario WHERE email = %s;", (email))
            user = cursor.fetchone()

            if user is None:
                return jsonify({
                    'status': 'failed',
                    'message': 'Email not found'
                })
            else:
                # Comprobamos si la contraseña es correcta
                checkPasswd = checkBcrypt(password, user['passwd'])

                if checkPasswd:
                    print("\n\nContraseña correcta!!!")
                    token = createJWT(user['id'], user['username'])
                    print('\nNEW JWT', token)
                    return jsonify({
                        'status': 'ok',
                        'message': 'Welcome',
                        'jwt': token
                    })
                else:
                    return jsonify({
                        'status': 'failed',
                        'message': 'Incorrect password'
                    })
                
        else:
            return jsonify({'error': 'Method not allowed'}), 405
    except:
        print('ERROR!')

@app.route('/auth/createUser', methods=["POST"])
@private_route_middleware
def createUser():
    try:
        if request.method == 'POST':
            data = request.json
            username = data.get('username')
            email = data.get('email')
            hashPassword = data.get('hashPassword')

            cursor = db.cursor()
            cursor.execute("SELECT * FROM Usuario WHERE email = %s;", (email))
            user = cursor.fetchone()
        
            if user is None:
                cursor.execute("INSERT INTO Usuario (username, email, passwd) VALUES (%s, %s, %s);", (username, email, hashPassword))
                db.commit()

                return jsonify({
                    'status': 'ok',
                    'message': 'User created!',
                })
            else:
                return jsonify({
                    'status': 'failed',
                    'message': 'Email already exists'
                })
        else:
            return jsonify({'error': 'Method not allowed'}), 405
    except:
        print('ERROR!')

@app.route('/auth/profile/<int:id>', methods=["GET"])
@private_route_middleware
def getProfile(id):
    try:
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Usuario WHERE id = %s;", (id))
        user = cursor.fetchone()
        cursor.close()
    except:
        print('ERROR!')
        
    return jsonify(user)



# Tasks API Routes
@app.route('/tasks', methods=["GET"])
def getAllTasks():
    try:
        cursor = db.cursor()
        cursor.execute("SELECT t.*, u.username AS 'creator_username' FROM Task t INNER JOIN Usuario u ON t.id_creator = u.id;")
        tasks = cursor.fetchall()
        cursor.close()
    except:
        print('ERROR!')
        
    return jsonify(tasks)

@app.route('/tasks/<int:id>', methods=["GET"])
def getTask(id):
    try:
        cursor = db.cursor()
        cursor.execute("SELECT t.*, u.username AS 'creator_username' FROM Task t INNER JOIN Usuario u ON t.id_creator = u.id WHERE t.id = %s;", (id))
        task = cursor.fetchone()
        cursor.close()

        res = {
            'message': 'ok',
            'data': task
        }
            
        return jsonify(res), 200
    except:
        print('ERROR!')
        res = {
            'message': 'failed'
        }
        return jsonify(res), 500

        
@app.route('/tasks/delete/<int:id>', methods=["DELETE"])
@private_route_middleware
def deleteTask(id):
    try:
        cursor = db.cursor()
        cursor.execute("DELETE FROM Task WHERE id = %s;", (id))

        db.commit()
        cursor.close()

        res = {
            'message': 'ok',
        }
            
        return jsonify(res), 200
    except:
        print('ERROR!')
        res = {
            'message': 'failed'
        }
        return jsonify(res), 500


@app.route('/tasks/modify/<int:id>', methods=["PUT"])
@private_route_middleware
def modifyTask(id):
    try:
        if request.method == 'PUT':
            data = request.json

            title = data.get('title')
            description = data.get('description')
            finished = data.get('finished')
            task_date = data.get('task_date')

            cursor = db.cursor()
            cursor.execute("UPDATE Task SET title = %s, description = %s, finished = %s, task_date = %s WHERE id = %s;", (
                title,
                description,
                finished,
                task_date,
                id
            ))
            
            db.commit()
            cursor.close()

            res = {
                'message': 'ok',
            }
            
            return jsonify(res), 200
        else:
            return jsonify({'error': 'Method not allowed'}), 405
    except:
        print('ERROR!')
        res = {
            'message': 'failed'
        }
        return jsonify(res), 500

        
@app.route('/tasks/new', methods=["POST"])
@private_route_middleware
def createTask():
    try:
        if request.method == 'POST':
            data = request.json

            title = data.get('title')
            description = data.get('description')
            id_creator = data.get('id_creator')
            task_date = data.get('task_date')

            cursor = db.cursor()
            cursor.execute("INSERT INTO Task (title, description, id_creator, task_date) VALUES (%s,%s,%s,%s);", (
                title,
                description,
                id_creator,
                task_date
            ))
            
            db.commit()
            id_res = cursor.lastrowid
            print("id_res", id_res)
            cursor.close()

            # INSERT INTO Task (title, description, id_creator, task_date) VALUE ()

            res = {
                'message': 'ok',
                'id': id_res
            }
            
            return jsonify(res), 200
        else:
            return jsonify({'error': 'Method not allowed'}), 405
    except:
        print('ERROR!')
        res = {
            'message': 'failed'
        }
        return jsonify(res), 500
        
        
    


if __name__ == "__main__" :
    app.run()