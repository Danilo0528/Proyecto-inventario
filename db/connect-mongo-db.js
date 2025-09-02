const mongoose = require('mongoose');

const getConnection = async () => {
  try {
    const url = 'mongodb+srv://danilopino_db_user:lpEowTqFaPAKjM7G@cluster0.0z2o16x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    await mongoose.connect(url);

    console.log('MongoDB connected');

  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = {
  getConnection
};