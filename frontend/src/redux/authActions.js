import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signIn, logOut, checkingCredentials } from '../slices/auth/AuthSlice';

// Función para iniciar sesión con Google
export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());  // Cambia el estado a "checking"
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            dispatch(signIn({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }));
        } catch (error) {
            console.error('Error en inicio de sesión con Google:', error);
            dispatch(logOut({ errorMessage: error.message }));  // Despacha logOut con el mensaje de error
        }
    };
};

// Función para iniciar sesión con email y password
export const startEmailPasswordLogin = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());  // Cambia el estado a "checking"

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            dispatch(signIn({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }));
        } catch (error) {
            console.error('Error en inicio de sesión con email y contraseña:', error);
            dispatch(logOut({ errorMessage: error.message }));  // Despacha logOut con el mensaje de error
        }
    };
};

// Función para cerrar sesión
export const startLogout = () => {
    return async (dispatch) => {
        try {
            await signOut(auth);  // Cierra la sesión en Firebase
            dispatch(logOut());  // Despacha la acción logOut en Redux
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Aquí podrías manejar el error si es necesario
        }
    };
};
