const { Schema, model } = require('mongoose');

const TipoSchema = new Schema({
  nombre: { 
    type: String, 
    required: true,
    unique: true 
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

TipoSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

module.exports = model('Tipo', TipoSchema);