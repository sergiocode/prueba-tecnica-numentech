# Prueba técnica Sergio Moyano

Instrucciones de como ejecutar el proyecto. El proyecto está separado en 2 carpetas:

- frontend
- backend

En la carpeta de frontend está el proyecto de React y en backend el servidor de Python

## Base de datos

Tanto en la carpeta de frontend como backend encontrarás un archivo llamado database.sql. Ábrelo y ejecuta el script. Este creará la base de datos, las tablas y los inserts.

## Backend
Esta carpeta contiene un archivo .env con los datos de prueba y las credenciales para acceder a la base de datos. Modifica DB_USER Y DB_PASSWORD para que el servidor pueda acceder.

Para levantar el servidor nos ubicamos en la carpeta ejecutamos:

    source venv/bin/activate
    python3 server.py

Comprobamos el puerto que usa para despues cambiarlo si es necesario en el .env de frontend

## Frontend

Esta carpeta contiene un archivo .env con las URL base para conectarnos al servidor. Modificamos el puerto de API_URL si es necesario.

Para levantar el frontend nos ubicamos en la carpeta y ejecutamos:

    npm i
    npm run build
    npm run start

