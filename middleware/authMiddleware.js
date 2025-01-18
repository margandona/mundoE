const { admin } = require('../database/firebaseconfig');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error('Error verifying token:', err.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
