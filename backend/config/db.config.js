const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fin_solutions',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Fixed: Uncommented executeQuery function
const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.execute(sql, params, (err, results, fields) => {
            if (err) {
                console.error('❌ Database query error:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Test connection
const testConnection = async () => {
    try {
        const connection = await pool.promise().getConnection();
        console.log('✅ Connected to MySQL database');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection error:', error);
        throw error;
    }
};

module.exports = {
    executeQuery, // Fixed: Now this is exported
    testConnection,
    pool
};