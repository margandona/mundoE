const admin = require('firebase-admin');
const serviceAccount = require('./radio.json'); // Ensure this path is correct

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mundoe-cf154.firebaseio.com' // Ensure this URL is correct
});

const db = admin.firestore();

console.log('Firestore initialized'); // Add logging

module.exports = { admin, db };
