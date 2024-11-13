require('dotenv').config();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const firebaseAdmin = () => {

  try {
    initializeApp({
      credential: cert(serviceAccount)
    });

    return (console.log("Firestore connection established"));

  } catch (error) {
    console.error("Error connecting to Firestore:", error.message);
    return { status: 500, message: `Error connecting to Firestore: ${error.message}` };
  }
};

module.exports = firebaseAdmin;
