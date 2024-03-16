import bcrypt

def checkBcrypt(text, encoded):
    return bcrypt.checkpw(text.encode('utf-8'), encoded.encode('utf-8'))