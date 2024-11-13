require('dotenv').config();

const dbFirestore = require('../db/firestore');
const dbConnection = require('../db/firebaseConnection');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const {GoogleAuthProvider} = require('firebase/auth');
const {getFirestore} = require('firebase-admin/firestore');
const { validationResult } = require('express-validator');
const generateJWT = require('../middlewares/jwt');

// Connect to Firebase
dbConnection();
dbFirestore();
const provider = new GoogleAuthProvider();
const db = getFirestore();
const auth = getAuth();

// Helper function for Firebase error handling
const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return { message: 'Ese correo ya se encuentra registrado. Elige otro', status: 409 };
    case 'auth/invalid-email':
      return { message: 'Formato de correo inválido', status: 400 };
    case 'auth/password-does-not-meet-requirements':
      return { message: 'La contraseña debe ser de al menos 6 caractéres. Incluyendo mínimo un número, una mayúscula, una minúscula y un carácter especial', status: 400 };
    case 'auth/user-not-found':
      return { message: 'Usuario no encontrado', status: 404 };
    case 'auth/wrong-password':
      return { message: 'Contraseña incorrecta. Intenta nuevamente', status: 401 };
    case 'auth/invalid-credential':
      return { message: 'Credenciales inválidas. Intenta nuevamente', status: 400 };
    default:
      return { message: errorCode, status: 500 };
  }
};

// Middleware for registration validation
const validation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed.', errors: errors.array() });
  }
}

const registerEmailPassword = async (req, res) => {
  validation(req);
  let uid;

  const { email, username, password, rol } = req.body;

  const data = {
    email: email,
    username: username,
    rol: rol,
    fechaCreacion: new Date().toISOString()
  };

  // existe?
  try {
    const usernameQuery = await db.collection('usuarios').where('username', '==', username).get();
    if (!usernameQuery.empty) {
      return res.status(409).json({ message: 'Nombre de usuario ya se encuentra en uso. Elige otro' });
    }
  } catch (error) {
    const errorCode = error.code;
    const firebaseError= getFirebaseErrorMessage(errorCode);
    console.error(`${firebaseError.status} - ${error}`);
    return res.status(firebaseError.status).json({ message: firebaseError.message });
  }


  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    uid = userCredential.user.uid;

    const firestoreRes = await db.collection('usuarios').doc(uid).set(data); // guardar en firestore
    console.log(`201 - Usuario registrado correctamente con UID: ${uid}`);
    return res.status(201).json({ message: 'Usuario registrado correctamente', userUID: uid });

  } catch (error) {
    const errorCode = error.code;
    const firebaseError= getFirebaseErrorMessage(errorCode);
    console.error(`${firebaseError.status} - ${error}`);
    return res.status(firebaseError.status).json({ message: firebaseError.message });
  }
};

// Firebase login
const loginEmailPassword = async (req, res) => {

  validation(req);
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseId = userCredential.user.uid;
    const token = generateJWT(firebaseId);
    return res.status(201).json({ message: 'Usuario loggeado correctamente', token, firebaseId });

  } catch (error) {
    // Handle Firebase error
    const errorCode = error.code;
    const firebaseError= getFirebaseErrorMessage(errorCode);
    console.error(`${firebaseError.status} - ${error}`);
    return res.status(firebaseError.status).json({ message: error });
  }

};

module.exports = { registerEmailPassword, loginEmailPassword };
