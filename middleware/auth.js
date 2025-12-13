const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send('No autorizado');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta_aqui');
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Token invalido');
  }
};

const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).send('No autenticado');
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).send('Sin permiso');
    }

    next();
  };
};

const soloAdmin = verificarRol(['admin']);

module.exports = {
  verificarToken,
  verificarRol,
  soloAdmin
};
