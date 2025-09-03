const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

// POST - Crear tipo
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, descripcion } = req.body;
      
      const tipoExistente = await Tipo.findOne({ nombre });
      if (tipoExistente) {
        return res.status(400).json({ msg: 'El tipo ya existe' });
      }

      const tipo = new Tipo({
        nombre,
        descripcion
      });

      await tipo.save();
      res.status(201).json(tipo);

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }
);

// GET - Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// PUT - Actualizar tipo
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const tipo = await Tipo.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, fechaActualizacion: new Date() },
      { new: true }
    );
    
    if (!tipo) {
      return res.status(404).json({ msg: 'Tipo no encontrado' });
    }
    
    res.json(tipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// DELETE - Eliminar tipo
router.delete('/:id', async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndDelete(req.params.id);
    if (!tipo) {
      return res.status(404).json({ msg: 'Tipo no encontrado' });
    }
    res.json({ msg: 'Tipo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;