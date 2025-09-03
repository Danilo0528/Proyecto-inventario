const { Schema, model } = require('mongoose');

const GeneroSchema = new Schema({
  nombre: { 
    type: String, 
    required: true,
    unique: true 
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
  },
  descripcion: { 
    type: String, 
    required: false 
  }
});

// Middleware para actualizar fechaActualizacion antes de guardar
GeneroSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

module.exports = model('Genero', GeneroSchema);