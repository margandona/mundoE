const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle } = require('../models/userModel');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await createUserWithEmailAndPassword(email, password);
        res.status(201).json({ message: 'User registered successfully.', userRecord });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: `Error registering user: ${err.message}` });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await signInWithEmailAndPassword(email, password);
        res.json({ token });
    } catch (err) {
        console.error('Error logging in user:', err.message);
        res.status(500).json({ error: `Error logging in user: ${err.message}` });
    }
};

exports.loginWithGoogle = async (req, res) => {
    const { idToken } = req.body;
    try {
        const userRecord = await signInWithGoogle(idToken);
        res.json({ userRecord });
    } catch (err) {
        console.error('Error logging in with Google:', err.message);
        res.status(500).json({ error: `Error logging in with Google: ${err.message}` });
    }
};
