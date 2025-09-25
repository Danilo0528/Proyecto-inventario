# Proyecto Inventario de Películas - CineFlix

Este proyecto es una aplicación web para gestionar un inventario de películas, series y otros medios. Consiste en un backend (API REST) construido con Node.js y Express, y un frontend construido con React.
## PRESENTADO POR
## DANILO JOSE PINO OSPINO
## ESTEBAN URRUTIA BERMIDEZ
## YEISON ANDRES MURILLO RAMIREZ
## DEMO
[render](https://inventario-front-it4i.onrender.com/)
hay veses que el servidor no conecta de demora unos minutos en reactivarse pero esta funcional en ambos sentidos
## Requisitos

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)
- Una base de datos de MongoDB (local o en la nube, como MongoDB Atlas)

## Configuración

Antes de ejecutar el proyecto, es necesario configurar las variables de entorno.

### 1. Backend

1.  En la raíz del proyecto, crea un archivo `.env`.
2.  Añade las siguientes variables, reemplazando los valores con tu configuración:

    ```
    # URL de conexión a tu base de datos de MongoDB
    MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxx.mongodb.net/nombre-de-tu-bd

    # Puerto para el servidor backend
    PORT=4000

    # URL donde se ejecuta el frontend (para la configuración de CORS)
    FRONTEND_URL=http://localhost:3000
    ```

### 2. Frontend

1.  Navega a la carpeta `front-inventario`.
2.  Crea un archivo `.env.local`.
3.  Añade la siguiente variable para apuntar al backend local:

    ```
    REACT_APP_API_URL=http://localhost:4000/api
    ```

## Instalación

Debes instalar las dependencias tanto para el backend como para el frontend.

1.  **Instalar dependencias del Backend:**
    *   En la terminal, desde la raíz del proyecto, ejecuta:
        ```bash
        npm install
        ```

2.  **Instalar dependencias del Frontend:**
    *   En la terminal, navega a la carpeta `front-inventario` y ejecuta:
        ```bash
        cd front-inventario
        npm install
        ```

## Ejecución del Proyecto

Para correr el proyecto, necesitas tener dos terminales abiertas.

1.  **Iniciar el Backend:**
    *   En una terminal, desde la raíz del proyecto, ejecuta:
        ```bash
        npm start
        ```
    *   El servidor se iniciará en el puerto que hayas configurado (por defecto, 4000).

2.  **Iniciar el Frontend:**
    *   En la segunda terminal, desde la carpeta `front-inventario`, ejecuta:
        ```bash
        npm start
        ```
    *   La aplicación de React se abrirá automáticamente en tu navegador en `http://localhost:3000`.
