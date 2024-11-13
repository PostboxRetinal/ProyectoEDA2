import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    },
});

// Interceptores para agregar token (si existe)
Api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Obtener token del localStorage si estás usando JWT
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default Api;
