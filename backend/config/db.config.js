const mysql = require('mysql2'); // Fixed: mysql2 (not myslq)

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           
    password: '', // Add your MySQL password if you have one
    database: 'fin_solutions'
});

// Test connection function
const testConnection = () => {
    db.connect((err) => {   
        if (err) {
            console.error('Database connection error:', err);
            throw err; // Important: throw error to catch in Server.js
        } else {
            console.log('✅ Connected to MySQL database.');
        }    
    });
};

// Execute query function (needed by your model)
const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Export both functions
module.exports = {
    testConnection,
    executeQuery  // This is needed by user.model.js
};