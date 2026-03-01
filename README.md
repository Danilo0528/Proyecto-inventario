# Proyecto Inventario de Películas - CineFlix

Este proyecto es una aplicación web para gestionar un inventario de películas, series y otros medios. Consiste en un backend (API REST) construido con Node.js y Express con **autenticación JWT**, un frontend construido con React.

## 🔐 ACTUALIZACIÓN: Sistema de Autenticación y Autorización con JWT

Se ha implementado un sistema completo de autenticación y autorización basado en JWT que permite:
- ✅ Registro e inicio de sesión de usuarios
- ✅ Contraseñas encriptadas con bcryptjs
- ✅ Roles de usuario (Admin y Docente)
- ✅ Protección de endpoints basada en roles
- ✅ Tokens JWT con expiración de 24 horas

## PRESENTADO POR
## ESTEBAN URRUTIA BERMIDEZ
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

    # Clave secreta para JWT (cambiar por una más segura en producción)
    JWT_SECRET=tu_clave_secreta_super_segura_2024_inventario

    # URL donde se ejecuta el frontend (para la configuración de CORS)
    FRONTEND_URL=http://localhost:3000
    ```

### 2. Frontend

1.  Navega a la carpeta `front-inventario`.
2.  Crea un archivo `.env.local`.
REACT_APP_API_URL=http://localhost:4000/api nuestra ruta en el env.local
# REACT_APP_API_URL=https://inventario-backend-y5ky.onrender.com/api/ para cuendo querimos ahoorar en uso del equipo

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
        node index.js
        ```
    *   El servidor se iniciará en el puerto que hayas configurado (por defecto, 4000).

2.  **Iniciar el Frontend:**
    *   En la segunda terminal, desde la carpeta `front-inventario`, ejecuta:
        ```bash
        cd front-inventario
        npm start
        ```

## 🔐 Autenticación y Autorización

### Sistema de Roles
El sistema cuenta con dos roles:
- **Admin**: Acceso completo a crear, editar, eliminar usuarios, géneros, directores, productoras, tipos y películas.
- **Docente**: Solo puede ver el listado de películas/medias.

### Endpoints de Autenticación
- `POST /api/auth/registrar` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión y obtener token JWT

### Uso del Token
Todos los endpoints protegidos requieren enviar el token en el header:
```
Authorization: Bearer <TOKEN_JWT>
```

### Ejemplo de Flujo de Autenticación
```javascript
// 1. Registrarse
POST /api/auth/registrar
{
  "nombre": "Admin Usuario",
  "email": "admin@test.com",
  "password": "admin123",
  "rol": "admin"
}

// 2. Login
POST /api/auth/login
{
  "email": "admin@test.com",
  "password": "admin123"
}

// Respuesta incluye token JWT:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {...}
}

// 3. Usar token en las peticiones
GET /api/generos
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Permisos por Rol

| Operación | Admin | Docente |
|-----------|-------|---------|
| Crear Géneros | ✅ | ❌ |
| Crear Directores | ✅ | ❌ |
| Crear Productoras | ✅ | ❌ |
| Crear Tipos | ✅ | ❌ |
| Crear Películas | ✅ | ❌ |
| Crear Usuarios | ✅ | ❌ |
| Editar Películas | ✅ | ❌ |
| Eliminar Películas | ✅ | ❌ |
| Ver Películas | ✅ | ✅ |
| Ver Géneros | ✅ | ✅ |
| Ver Directores | ✅ | ✅ |

Para más información sobre las pruebas de API, consulta el archivo `PRUEBAS_API.md`
    *   La aplicación de React se abrirá automáticamente en tu navegador en `http://localhost:3000`.
