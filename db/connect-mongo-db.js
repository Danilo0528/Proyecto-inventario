const mongoose = require('mongoose');

const getConnection = async () => {
  try {
    const url = 'mongodb+srv://danilopino_db_user:lpEowTqFaPAKjM7G@cluster0.0z2o16x.mongodb.net/peliculas_db?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(url);
    
    console.log('MongoDB connected - Base de datos de películas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Función para cerrar la conexión correctamente
const closeConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = {
  getConnection,
  closeConnection
};