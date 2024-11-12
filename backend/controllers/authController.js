require('dotenv').config();

const dbConnection = require('../db/firebaseConnection');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { validationResult } = require('express-validator');
const generateJWT = require('../middlewares/jwt');
const User = require('../models/usuarioModel'); // Asegúrate de tener el modelo User
const bcrypt = require('bcrypt');

// Helper function for Firebase error handling
const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return { message: 'The email address is already registered.', status: 409 };
    case 'auth/invalid-email':
      return { message: 'The email address format is invalid.', status: 400 };
    case 'auth/password-does-not-meet-requirements':
      return { message: 'The password is too weak or does not meet the required criteria. Please use a stronger one.', status: 400 };
    case 'auth/user-not-found':
      return { message: 'No user found with this email.', status: 404 };
    case 'auth/wrong-password':
      return { message: 'Incorrect password. Please try again.', status: 401 };
    case 'auth/invalid-credential':
      return { message: 'Invalid credentials. Please try again.', status: 400 };
    default:
      return { message: '', status: 500 };
  }
};

const firebaseApp = dbConnection(); // Connect to Firebase

// Firebase registration
const registerEmailPassword = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  const { nombre, username, email, password, rol = 'Participante' } = req.body;

  try {
    // Registrar el usuario en Firebase
    let userCredential = await createUserWithEmailAndPassword(auth, email, password);

  } catch(error){
      const { message, status } = getFirebaseErrorMessage(error.code);
      return res.status(status || 500).json({ message: message || error.message, errorCode: error.code });
  }

  // Hashear la contraseña antes de guardarla en MongoDB
  const hashedPassword = bcrypt.hash(password, 10);

  // Crear un nuevo usuario en MongoDB con el uid de Firebase
  const newUser = new User({
    nombre,
    username,
    email,
    rol,
    hashedPassword,
    firebaseId: userCredential.user.uid,
  });

  try {
    await newUser.save();  // Crear el usuario en MongoDB con la contraseña hasheada
    return res.status(201).json({ message: 'User registered successfully.', user: newUser });

  } catch (error) {
      return res.status(500).json({ message: 'Error registering user.', error: error.message });
  }
};

// Firebase login
const loginEmailPassword = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }

  const { email, password } = req.body;
  const firebaseId = userCredential.user.uid;  //
  const token = generateJWT(firebaseId);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return res.status(200).json({ message: 'User logged in successfully.', token, user });

  } catch (error) {
      const firebaseError = getFirebaseErrorMessage(error.code);
      return res.status(firebaseError.status).json({ message: firebaseError.message });
  }
  // IMPLEMENTACION OPCIONAL: Buscar el usuario en MongoDB
  // try {
  //     // Opcional: Puedes buscar el usuario en MongoDB para obtener más información
  //     const user = await User.findOne({ firebaseId });
  //     if (!user) {
  //       return res.status(404).json({ message: 'No user found in the database.' });
  //     }
  // } catch (error) {

  // }
};

module.exports = { registerEmailPassword, loginEmailPassword };
