const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

// POST - Crear productora
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
      const { nombre, estado, slogan, descripcion } = req.body;
      
      const productoraExistente = await Productora.findOne({ nombre });
      if (productoraExistente) {
        return res.status(400).json({ msg: 'La productora ya existe' });
      }

      const productora = new Productora({
        nombre,
        estado,
        slogan,
        descripcion
      });

      await productora.save();
      res.status(201).json(productora);

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }
);

// GET - Obtener todas las productoras
router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// GET - Obtener productoras activas
router.get('/activas', async (req, res) => {
  try {
    const productoras = await Productora.find({ estado: 'Activo' });
    res.json(productoras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// PUT - Actualizar productora
router.put('/:id', async (req, res) => {
  try {
    const { nombre, estado, slogan, descripcion } = req.body;
    const productora = await Productora.findByIdAndUpdate(
      req.params.id,
      { nombre, estado, slogan, descripcion, fechaActualizacion: new Date() },
      { new: true }
    );
    
    if (!productora) {
      return res.status(404).json({ msg: 'Productora no encontrada' });
    }
    
    res.json(productora);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// DELETE - Eliminar productora
router.delete('/:id', async (req, res) => {
  try {
    const productora = await Productora.findByIdAndDelete(req.params.id);
    if (!productora) {
      return res.status(404).json({ msg: 'Productora no encontrada' });
    }
    res.json({ msg: 'Productora eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;