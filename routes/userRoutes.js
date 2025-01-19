const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users/register', userController.register); // Ensure the route is correct
router.post('/users/login', userController.login); // Ensure the route is correct
router.post('/users/login/google', userController.loginWithGoogle);

module.exports = router;