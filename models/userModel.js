const { admin, db } = require('../database/firebaseconfig');
const bcrypt = require('bcrypt');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const createUserWithEmailAndPassword = async (email, password, fullName, username, city) => {
    if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
    }
    if (!passwordRegex.test(password)) {
        throw new Error('Password must contain at least 1 uppercase letter, 1 number, 1 symbol, and be at least 8 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRecord = await admin.auth().createUser({
        email: email,
        password: hashedPassword
    });
    await db.collection('users').doc(userRecord.uid).set({
        email: email,
        fullName: fullName,
        username: username,
        city: city,
        createdAt: new Date().toISOString(),
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
