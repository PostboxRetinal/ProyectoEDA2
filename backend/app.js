require('dotenv').config()
const express = require('express');
const cors = require('cors');
const dbConnection = require('./db/firebaseConnection');
const requestLog = require('./middlewares/reqLog');
const { authMiddleware } = require('./middlewares/authMiddleware');
const homeRoute = require('./routes/homeRoute');
const authRoutes = require('./routes/authRoute');
const eventoRoutes = require('./routes/eventoRoute');

const app = express();
const PORT = process.env.PORT;
const VERSION = process.env.VERSION;

const firebaseApp = dbConnection(); // Connect to Firebase

if (firebaseApp.status !== 200) {
  console.error(firebaseApp.message);
  process.exit(1); // Exit the process if Firebase connection fails
}else{
  console.log(firebaseApp.message);
}

app.use([
  cors({
    origin: ['localhost:5173'], // allowed domains
    methods: ['GET', 'POST', 'PUT', 'PATCH'], // allowed methods
    allowedHeaders: ['Content-Type', 'Authorization',   ] // allowed headers
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  requestLog,

]);

app.use('/api/home', homeRoute);
app.use('/api/auth', authRoutes);
app.use('/api/events', authMiddleware, eventoRoutes);

//Rutas no existentes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Recurso no existente' });
});

app.listen(PORT, () => {
  console.log(`-----\n meetusBackend v${VERSION}\n Running on port ${PORT} \n-----`);
});
