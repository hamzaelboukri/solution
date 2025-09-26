const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      console.log('📨 Register attempt:', { name, email, password }); // Add logging

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email'
        });
      }

      // Create user - FIXED METHOD NAME
      const userId = await User.create({ name, email, password });
      
      // Generate JWT token (using simple secret for now)
      const token = jwt.sign(
        { userId, email }, 
        process.env.JWT_SECRET || 'fallback-secret', 
        { expiresIn: '24h' }
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: { id: userId, name, email }
      });

    } catch (error) {
      console.error('❌ Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error: ' + error.message
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      console.log('📨 Login attempt:', { email, password }); // Add logging

      // Find user by email - FIXED METHOD NAME
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check password
      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email }, 
        process.env.JWT_SECRET || 'fallback-secret', 
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email 
        }
      });

    } catch (error) {
      console.error('❌ Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error: ' + error.message
      });
    }
  }

}

module.exports = AuthController;