const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

const router = Router();

// LOGIN
router.post('/login', [
    check('email', 'Email inválido').isEmail(),
    check('password', 'Password requerido').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).send('Usuario no encontrado');
        }
        const esValida = await usuario.comparePassword(password);
        if (!esValida) {
            return res.status(400).send('Contraseña incorrecta');
        }
        if (usuario.estado !== 'activo') {
            return res.status(401).send('El usuario está inactivo');
        }
        const payload = {
            id: usuario._id,
            email: usuario.email,
            rol: usuario.rol
        };
        const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET || 'secreto_super_seguro', 
            { expiresIn: '12h' }
        );

        res.json({ 
            token, 
            usuario: usuario.toJSON()
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

// REGISTRO 
router.post('/registrar', [
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
            return res.status(400).send('El email ya está registrado');
        }
        const nuevoUsuario = new User({
            nombre,email,password,
            rol: rol || 'docente',
            estado: 'activo'
        });
        await nuevoUsuario.save();

        res.status(201).json(nuevoUsuario.toJSON());

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al guardar usuario');
    }
});

module.exports = router;
