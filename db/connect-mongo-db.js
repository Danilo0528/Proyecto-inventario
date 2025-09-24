const mongoose = require('mongoose');

const getConnection = async () => {
  try {
    const url = process.env.MONGO_URI;
    
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