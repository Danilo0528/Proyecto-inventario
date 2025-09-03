const { Router } = require('express');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

// POST - Crear media
router.post(
  '/',
  [
    check('serial', 'El serial es obligatorio').not().isEmpty(),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
    check('sinopsis', 'La sinopsis es obligatoria').not().isEmpty(),
    check('url', 'La URL es obligatoria').not().isEmpty(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty(),
    check('anioEstreno', 'El año de estreno debe ser un número').isNumeric(),
    check('genero', 'El género es obligatorio').not().isEmpty(),
    check('director', 'El director es obligatorio').not().isEmpty(),
    check('productora', 'La productora es obligatoria').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { serial, titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo } = req.body;
      
      // Verificar que el serial y URL sean únicos
      const mediaExistente = await Media.findOne({ $or: [{ serial }, { url }] });
      if (mediaExistente) {
        return res.status(400).json({ msg: 'El serial o URL ya existe' });
      }

      // Verificar que las referencias existan y estén activas
      const generoDoc = await Genero.findById(genero);
      if (!generoDoc || generoDoc.estado !== 'Activo') {
        return res.status(400).json({ msg: 'El género no existe o no está activo' });
      }

      const directorDoc = await Director.findById(director);
      if (!directorDoc || directorDoc.estado !== 'Activo') {
        return res.status(400).json({ msg: 'El director no existe o no está activo' });
      }

      const productoraDoc = await Productora.findById(productora);
      if (!productoraDoc || productoraDoc.estado !== 'Activo') {
        return res.status(400).json({ msg: 'La productora no existe o no está activa' });
      }

      const tipoDoc = await Tipo.findById(tipo);
      if (!tipoDoc) {
        return res.status(400).json({ msg: 'El tipo no existe' });
      }

      const media = new Media({
        serial,
        titulo,
        sinopsis,
        url,
        imagen,
        anioEstreno,
        genero,
        director,
        productora,
        tipo
      });

      await media.save();
      
      // Poplar las referencias para mostrar información completa
      await media.populate(['genero', 'director', 'productora', 'tipo']);
      
      res.status(201).json(media);

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error del servidor' });
    }
  }
);

// GET - Obtener todas las medias con información poblada
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero', 'nombre')
      .populate('director', 'nombres')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');
    res.json(medias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// GET - Obtener media por ID
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('genero')
      .populate('director')
      .populate('productora')
      .populate('tipo');
      
    if (!media) {
      return res.status(404).json({ msg: 'Media no encontrada' });
    }
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// PUT - Actualizar media
router.put('/:id', async (req, res) => {
  try {
    const { titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo } = req.body;
    
    // Verificar referencias si se proporcionan
    if (genero) {
      const generoDoc = await Genero.findById(genero);
      if (!generoDoc || generoDoc.estado !== 'Activo') {
        return res.status(400).json({ msg: 'El género no existe o no está activo' });
      }
    }

    if (director) {
      const directorDoc = await Director.findById(director);
      if (!directorDoc || directorDoc.estado !== 'Activo') {
        return res.status(400).json({ msg: 'El director no existe o no está activo' });
      }
    }

    if (productora) {
      const productoraDoc = await Productora.findById(productora);
      if (!productoraDoc || productoraDoc.estado !== 'Activo') {
        return res.status(400).json({ msg: 'La productora no existe o no está activa' });
      }
    }

    if (tipo) {
      const tipoDoc = await Tipo.findById(tipo);
      if (!tipoDoc) {
        return res.status(400).json({ msg: 'El tipo no existe' });
      }
    }

    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { 
        titulo, 
        sinopsis, 
        url, 
        imagen, 
        anioEstreno, 
        genero, 
        director, 
        productora, 
        tipo,
        fechaActualizacion: new Date() 
      },
      { new: true }
    ).populate(['genero', 'director', 'productora', 'tipo']);
    
    if (!media) {
      return res.status(404).json({ msg: 'Media no encontrada' });
    }
    
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

// DELETE - Eliminar media
router.delete('/:id', async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ msg: 'Media no encontrada' });
    }
    res.json({ msg: 'Media eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
});

module.exports = router;