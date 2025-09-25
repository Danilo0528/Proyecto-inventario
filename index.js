require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getConnection, closeConnection } = require('./db/connect-mongo-db');

const app = express();
const port = process.env.PORT || 4000;

// Variable para el servidor
let server;

// Conexión a la base de datos
getConnection();

// Middlewares - Configuración de CORS para múltiples orígenes (local y producción)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000', // Tu frontend local
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite solicitudes sin 'origin' (como Postman o apps móviles) o si el origen está en la lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// Rutas
app.use('/api/generos', require('./routes/genero'));
app.use('/api/directores', require('./routes/director'));
app.use('/api/productoras', require('./routes/productora'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/medias', require('./routes/media'));

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    msg: 'API REST - Sistema de Gestión de Películas',
    version: '1.0.0',
    endpoints: {
      generos: '/api/generos',
      directores: '/api/directores',
      productoras: '/api/productoras',
      tipos: '/api/tipos',
      medias: '/api/medias'
    }
  });
});

// Función para cerrar servidor correctamente
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Closing server gracefully...`);
  
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed');
      await closeConnection();
      console.log('Application terminated');
      process.exit(0);
    });
  } else {
    await closeConnection();
    process.exit(0);
  }
};

// Escuchar señales de cierre
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Manejo de errores no capturados
process.on('unhandledRejection', async (err) => {
  console.error('Unhandled Rejection:', err);
  await closeConnection();
  process.exit(1);
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await closeConnection();
  process.exit(1);
});

// Iniciar servidor
server = app.listen(port, () => {
  console.log(`🎬 Servidor corriendo en puerto ${port}`);
  console.log(`📡 API disponible en http://localhost:${port}`);
  console.log(`👋 Presiona Ctrl+C para detener el servidor`);
});

// Configurar timeout del servidor
server.timeout = 60000; // 60 segundos
