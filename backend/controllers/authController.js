require('dotenv').config();

const dbFirestore = require('../db/firebaseAdmin');
const dbConnection = require('../db/firebaseConnection');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } = require('firebase/auth');
const {GoogleAuthProvider} = require('firebase/auth');
const {getFirestore} = require('firebase-admin/firestore');
const { validationResult } = require('express-validator');
const generateJWT = require('../middlewares/jwt');
const getFirebaseErrorMessage = require('../helpers/firebaseErrors');

// Connect to Firebase
dbConnection();
dbFirestore();
const provider = new GoogleAuthProvider();
const db = getFirestore();
const auth = getAuth();

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
    const firebaseErrors = getFirebaseErrorMessage(errorCode)
    console.error(`${firebaseErrors.status} - ${error}`);
    return res.status(firebaseErrors.status).json({ message: firebaseErrors.message });
  }


  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    uid = userCredential.user.uid;

    await sendEmailVerification(user); // Enviar correo de verificación

    const firestoreRes = await db.collection('usuarios').doc(uid).set(data); // guardar en firestore
    console.log(`201 - Usuario registrado correctamente con UID: ${uid}`);
    return res.status(201).json({ message: 'Usuario registrado correctamente', userUID: uid });

  } catch (error) {
    const errorCode = error.code;
    const firebaseErrors = getFirebaseErrorMessage(errorCode)
    console.error(`${firebaseErrors.status} - ${error}`);
    return res.status(firebaseErrors.status).json({ message: firebaseErrors.message });
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
    const firebaseErrors = getFirebaseErrorMessage(errorCode)
    console.error(`${firebaseErrors.status} - ${error}`);
    return res.status(firebaseErrors.status).json({ message: error });
  }

};

module.exports = { registerEmailPassword, loginEmailPassword };
