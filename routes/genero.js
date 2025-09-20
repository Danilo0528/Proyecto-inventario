const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

// POST - Crear género
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, estado, descripcion } = req.body;
      
      // Verificar si ya existe el género
      const generoExistente = await Genero.findOne({ nombre });
      if (generoExistente) {
        return res.status(400).json({ msg: 'El género ya existe' });
      }

      const genero = new Genero({
        nombre,
        estado,
        descripcion
      });

      await genero.save();
      res.status(201).json(genero);

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }
);

// GET - Obtener todos los géneros
router.get('/', async (req, res) => {
    try {
        console.log('--- Antes de la consulta a la base de datos ---'); // <-- Añade esto
        const generos = await Genero.find();
        console.log('--- Después de la consulta a la base de datos ---'); // <-- Añade esto
        res.json(generos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});


// GET - Obtener géneros activos
router.get('/activos', async (req, res) => {
  try {
    const generos = await Genero.find({ estado: 'Activo' });
    res.json(generos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// GET - Obtener género por ID
router.get('/:id', async (req, res) => {
  try {
    const genero = await Genero.findById(req.params.id);
    if (!genero) {
      return res.status(404).json({ msg: 'Género no encontrado' });
    }
    res.json(genero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// PUT - Actualizar género
router.put('/:id', async (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    const genero = await Genero.findByIdAndUpdate(
      req.params.id,
      { nombre, estado, descripcion, fechaActualizacion: new Date() },
      { new: true }
    );
    
    if (!genero) {
      return res.status(404).json({ msg: 'Género no encontrado' });
    }
    
    res.json(genero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// DELETE - Eliminar género
router.delete('/:id', async (req, res) => {
  try {
    const genero = await Genero.findByIdAndDelete(req.params.id);
    if (!genero) {
      return res.status(404).json({ msg: 'Género no encontrado' });
    }
    res.json({ msg: 'Género eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;