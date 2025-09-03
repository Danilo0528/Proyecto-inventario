const { Schema, model } = require('mongoose');

const DirectorSchema = new Schema({
  nombres: { 
    type: String, 
    required: true 
  },
  estado: { 
    type: String, 
    required: true, 
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  },
  fechaCreacion: { 
    type: Date, 
    default: Date.now 
  },
  fechaActualizacion: { 
    type: Date, 
    default: Date.now 
  }
});

DirectorSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

module.exports = model('Director', DirectorSchema);
