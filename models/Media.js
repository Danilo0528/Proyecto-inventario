const { Schema, model } = require('mongoose');

const MediaSchema = new Schema({
  serial: { 
    type: String, 
    required: true, 
    unique: true 
  },
  titulo: { 
    type: String, 
    required: true 
  },
  sinopsis: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true, 
    unique: true 
  },
  imagen: { 
    type: String, 
    required: true 
  },
  fechaCreacion: { 
    type: Date, 
    default: Date.now 
  },
  fechaActualizacion: { 
    type: Date, 
    default: Date.now 
  },
  anioEstreno: { 
    type: Number, 
    required: true 
  },
  genero: { 
    type: Schema.Types.ObjectId, 
    ref: 'Genero', 
    required: true 
  },
  director: { 
    type: Schema.Types.ObjectId, 
    ref: 'Director', 
    required: true 
  },
  productora: { 
    type: Schema.Types.ObjectId, 
    ref: 'Productora', 
    required: true 
  },
  tipo: { 
    type: Schema.Types.ObjectId, 
    ref: 'Tipo', 
    required: true 
  }
});

MediaSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

module.exports = model('Media', MediaSchema);