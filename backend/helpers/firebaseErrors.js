const firebaseErrors = (errorCode) => {
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

module.exports = firebaseErrors;
