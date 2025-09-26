const  {excuteQuery} = require('../config/db');

class USER {

    static async createUser(userdata) {
        const{name,email,password } = userdata;
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const result = await excuteQuery(query, [name, email, password]);
        return result.insertId;
    }

    static async getUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const results = await excuteQuery(query, [email]);
        return results[0];
    }

    static async getUserById(id) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const results = await excuteQuery(query, [id]);
        return results[0];
    }

    static async updateUser(id, userdata) {
        const {name,email,password} = userdata;
        const query= "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? ";
        const result = await excuteQuery(query, [name,email,password,id]);
        return result.affectedRows > 0;
    }
        

    static async deleteUser(id) {
        const query = 'DELETE FROM users WHERE id = ?';
        const result = await excuteQuery(query, [id]);
        return result.affectedRows > 0;
    }

}