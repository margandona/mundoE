import firebaseConfig from './firebaseconfig.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    const db = firebase.firestore();
    // Make db available globally
    window.db = db;
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!window.db) {
        console.error('Firebase not initialized');
        alert('Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    window.db.collection('contacts').add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Mensaje enviado con éxito');
        document.getElementById('contactForm').reset();
    }).catch((error) => {
        console.error('Error al enviar el mensaje: ', error);
        alert('Error al enviar el mensaje. Inténtalo de nuevo más tarde.');
    });
});
