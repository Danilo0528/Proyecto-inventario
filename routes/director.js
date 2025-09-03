const { Router } = require('express');
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

// POST - Crear director
router.post(
  '/',
  [
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('estado', 'El estado debe ser Activo o Inactivo').isIn(['Activo', 'Inactivo']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombres, estado } = req.body;

      const director = new Director({
        nombres,
        estado
      });

      await director.save();
      res.status(201).json(director);

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }
);

// GET - Obtener todos los directores
router.get('/', async (req, res) => {
  try {
    const directores = await Director.find();
    res.json(directores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// GET - Obtener directores activos
router.get('/activos', async (req, res) => {
  try {
    const directores = await Director.find({ estado: 'Activo' });
    res.json(directores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// PUT - Actualizar director
router.put('/:id', async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      { nombres, estado, fechaActualizacion: new Date() },
      { new: true }
    );
    
    if (!director) {
      return res.status(404).json({ msg: 'Director no encontrado' });
    }
    
    res.json(director);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// DELETE - Eliminar director
router.delete('/:id', async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) {
      return res.status(404).json({ msg: 'Director no encontrado' });
    }
    res.json({ msg: 'Director eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;