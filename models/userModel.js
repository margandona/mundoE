const { admin, db } = require('../database/firebaseconfig');

const createUserWithEmailAndPassword = async (email, password) => {
    const userRecord = await admin.auth().createUser({
        email: email,
        password: password
    });
    await db.collection('users').doc(userRecord.uid).set({
        email: email,
        role: 'user'
    });
    return userRecord;
};

const signInWithEmailAndPassword = async (email, password) => {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    return token;
};

const signInWithGoogle = async (idToken) => {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    return userRecord;
};

module.exports = { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle };
