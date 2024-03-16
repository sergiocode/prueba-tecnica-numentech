import jwt
import os
import secrets
from dotenv import load_dotenv
import datetime

load_dotenv()

def generateSecret(length):
    return secrets.token_hex(length)


# Función para crear un JWT
def createJWT(id, username):
    jwt_secret = os.environ.get('JWT_SECRET')
    
    # El token será solo válido durante 1 hora
    fecha = datetime.datetime.now(datetime.timezone.utc)
    expiration = fecha + datetime.timedelta(hours=5)

    payload = {'id': id, 'username': username, 'exp': expiration}

    print('\n\nPAYLOAD -> ', payload)
    
    token = jwt.encode(payload, jwt_secret, algorithm='HS256')
    return token