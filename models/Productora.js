const { Schema, model } = require('mongoose');

const ProductoraSchema = new Schema({
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
  slogan: { 
    type: String, 
    required: false 
  },
  descripcion: { 
    type: String, 
    required: false 
  }
});

ProductoraSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

module.exports = model('Productora', ProductoraSchema);