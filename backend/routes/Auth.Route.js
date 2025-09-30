const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller'); // Fixed path and variable name

// Test route to verify routing works
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes working!', timestamp: new Date() });
});

// POST /api/auth/register
router.post('/register', AuthController.register);

// POST /api/auth/login
router.post('/login', AuthController.login);

// GET /api/auth/profile (protected route)
// router.get('/profile', authMiddleware, AuthController.getProfile);

module.exports = router;