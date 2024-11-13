require("dotenv").config();
const { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGINGSENDER_ID, APP_ID, MEASUREMENT_ID } = process.env;
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGINGSENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const dbConnection = () => {
  try {
    const app = initializeApp(firebaseConfig);

  } catch (error) {
    return { status: 500, message: `Error connecting to Firebase: ${error.message}` };
  }

  return { status: 200, message: "Firebase connection established" }
};

module.exports = dbConnection;
