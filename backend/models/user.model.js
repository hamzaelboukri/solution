const { executeQuery } = require('../config/db.config');

class User {
    static async create(userData) {
        try {
            const { name, email, password } = userData;
            const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            const result = await executeQuery(query, [name, email, password]);
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const results = await executeQuery(query, [email]);
            return results[0] || null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const results = await executeQuery(query, [id]);
            return results[0] || null;
        } catch (error) {
            console.error('Error finding user by id:', error);
            throw error;
        }
    }
}

module.exports = User;