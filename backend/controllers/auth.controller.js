const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController {
    static async register(req, res) {
        console.log(' REGISTRATION STARTED');
        
        try {
            const { name, email, password } = req.body;
            
            console.log(' Request - Name:', name, 'Email:', email);

            if (!name || !email || !password) {
                console.log(' Missing fields');
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                console.log(' User exists');
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }

            console.log(' HASHING PASSWORD...');
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(' PASSWORD HASHED:', hashedPassword.substring(0, 20) + '...');

            console.log(' Saving to database...');
            const userId = await User.create({
                name,
                email,
                password: hashedPassword
            });

            console.log(' User created with ID:', userId);

            const token = jwt.sign(
                { userId, email },
                process.env.JWT_SECRET || 'secret123',
                { expiresIn: '24h' }
            );

            res.status(201).json({
                success: true,
                message: 'User registered with hashed password',
                token,
                user: { id: userId, name, email }
            });

        } catch (error) {
            console.error(' ERROR:', error);
            res.status(500).json({
                success: false,
                message: 'Registration failed'
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password required'
                });
            }

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret123',
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
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Login failed'
            });
        }
    }
}

module.exports = AuthController;
