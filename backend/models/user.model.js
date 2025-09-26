const { executeQuery } = require('../config/db.config'); // Fixed path

class User { // Changed from USER to User
    static async create(userData) { // Changed from createUser to create
        const { name, email, password } = userData;
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const result = await executeQuery(query, [name, email, password]);
        return result.insertId;
    }

    static async findByEmail(email) { 
        const query = 'SELECT * FROM users WHERE email = ?';
        const results = await executeQuery(query, [email]);
        return results[0];
    }

    static async findById(id) { 
        const query = 'SELECT * FROM users WHERE id = ?';
        const results = await executeQuery(query, [id]);
        return results[0];
    }
}

// Don't forget to export!
module.exports = User;