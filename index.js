const express = require('express');
const cors = require('cors');
const { getConnection } = require('./db/connect-mongo-db');

const app = express();
const port = process.env.PORT || 3000;

// Conexión a la base de datos
getConnection();

// Middlewares
app.use(cors());
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

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});