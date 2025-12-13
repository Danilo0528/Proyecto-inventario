const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const { verificarToken, soloAdmin } = require('../middleware/auth');

const router = Router();

// obtener todos los usuarios 
router.get('/', verificarToken, soloAdmin, async (req, res) => {
  try {
    const usuarios = await User.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

// obtener usuarios activos
router.get('/activos', verificarToken, soloAdmin, async (req, res) => {
  try {
    const usuarios = await User.find({ estado: 'activo' }).select('-password');
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

// obtener usuario por ID
router.get('/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select('-password');
    if (!usuario) {
      return res.status(404).send('No existe');
    }
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

// crear usuario 
router.post('/', [
  verificarToken,
  soloAdmin,
  check('nombre', 'Nombre inválido').notEmpty(),
  check('email', 'Email inválido').isEmail(),
  check('password', 'Password requerido').notEmpty(),
  check('rol', 'Rol inválido').optional().isIn(['admin', 'docente'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).send('El email ya existe');
    }

    const usuario = new User({
      nombre,
      email,
      password,
      rol: rol || 'docente'
    });

    await usuario.save();
    res.status(201).json(usuario.toJSON());

  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

// actualizar usuario
router.put('/:id', [
  verificarToken,
  soloAdmin,
  check('nombre', 'Nombre inválido').optional().notEmpty(),
  check('email', 'Email inválido').optional().isEmail(),
  check('rol', 'Rol invalido').optional().isIn(['admin', 'docente']),
  check('estado', 'Estado invalido').optional().isIn(['activo', 'inactivo'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const { nombre, email, rol, estado } = req.body;

    const usuario = await User.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        email,
        rol,
        estado,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    if (!usuario) {
      return res.status(404).send('No existe');
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

// eliminar usuario
router.delete('/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).send('No existe');
    }
    res.send('Usuario eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
});

module.exports = router;
