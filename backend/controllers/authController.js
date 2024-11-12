require('dotenv').config();

const dbConnection = require('../db/firebaseConnection');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { validationResult } = require('express-validator');
const generateJWT = require('../middlewares/jwt');

// Helper function for Firebase error handling
const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return { message: 'Ese correo ya se encuentra registrado', status: 409 };
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

// Connect to Firebase
dbConnection();
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
  const { email, password, rol = 'Participante' } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(`201 - Usuario registrado correctamente con UID: ${userCredential.user.uid}`);
    return res.status(201).json({ message: 'Usuario registrado correctamente', userUID: userCredential.user.uid });

  } catch (error) {
    // Handle Firebase error
    const errorCode = error.code;
    const firebaseError= getFirebaseErrorMessage(errorCode);
    console.error(`${firebaseError.status} - ${firebaseError.message}`);
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
  // IMPLEMENTACION OPCIONAL: Buscar el usuario en MongoDB
  // // Hashear la contraseña antes de guardarla en MongoDB
  // const hashedPassword = bcrypt.hash(password, 10);

  // // Crear un nuevo usuario en MongoDB con el uid de Firebase
  // const newUser = new User({
  //   nombre,
  //   username,
  //   email,
  //   rol,
  //   hashedPassword,
  //   firebaseId: userCredential.user.uid,
  // });
  //
  // try {
  //     // Opcional: Puedes buscar el usuario en MongoDB para obtener más información
  //     const user = await User.findOne({ firebaseId });
  //     if (!user) {
  //       return res.status(404).json({ message: 'No user found in the database.' });
  //     }
  // } catch (error) {

  // }
  // try {
  //   await newUser.save();  // Crear el usuario en MongoDB con la contraseña hasheada
  //   return res.status(201).json({ message: 'User registered successfully.', user: newUser });

  // } catch (error) {
  //     return res.status(500).json({ message: 'Error registering user.', error: error.message });
  // }

};

module.exports = { registerEmailPassword, loginEmailPassword };
