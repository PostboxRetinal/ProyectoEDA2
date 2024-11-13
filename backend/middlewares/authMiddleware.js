const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Middleware for registration validation
const validateRegister = [
  body('email').isEmail().withMessage('Asegúrate de ingresar un correo válido'),
  body('password').isStrongPassword().withMessage('Tu contraseña debe tener al menos 6 caracteres, una letra mayúscula, una minúscula, un número y un símbolo'),
  body('password').notEmpty().withMessage('La contraseña no puede estar vacía'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validación fallida: ', errors: errors.array() });
    }
    next();
  },
];

// De manera similar para el login
const validateLogin = [
  body('email').isEmail().withMessage('Asegúrate de ingresar un correo válido'),
  body('password').notEmpty().withMessage('La contraseña no puede estar vacía'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validación fallida', errors: errors.msg });
    }
    next();
  },
];

const authMiddleware = (req, res, next) => {

  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    console.error(`401 - Acceso denegado. No hay token.`);
    return res.status(401).json({ message: 'Acceso denegado. No hay token.' });

  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.uid;
    next();

  } catch (error) {

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido.' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token ha expirado.' });
    }
    return res.status(400).json({ message: 'Error de autenticación.' });
  }
};

module.exports = {authMiddleware, validateRegister, validateLogin};
