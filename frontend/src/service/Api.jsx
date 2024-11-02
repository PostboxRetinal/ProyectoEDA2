import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
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
