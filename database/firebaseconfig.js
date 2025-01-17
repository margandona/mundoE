const admin = require('firebase-admin');
const serviceAccount = require('./radio.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com' // Asegúrate de reemplazar <your-database-name> con el nombre de tu base de datos
});

const db = admin.firestore();

console.log('Firestore initialized'); // Add logging

module.exports = { admin, db };
