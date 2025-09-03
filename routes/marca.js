const { Router } = require('express');
const Marca = require('../models/Marca');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').isIn(['Activo', 'Inactivo']),
  ],
  async (req, res) => {
    // Validar los campos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Crear una nueva instancia de Marca
      let marca = new Marca();
      marca.nombre = req.body.nombre;
      marca.estado = req.body.estado;
      marca.fechaCreacion = new Date();
      marca.fechaActualizacion = new Date();

      // Guardar la marca en la base de datos
      await marca.save();
      res.status(201).json(marca);

    } catch (error) {
      // Manejar errores del servidor
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }
);


// Ruta GET para obtener todas las marcas
router.get('/', async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;