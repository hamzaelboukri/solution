const myslq = require('mysql');

const db = myslq.createConnection({
    host: 'localhost',
    user: 'root',           
    password: '',
    database: 'fin_solutions'
});

db.connect((err) => {   
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    }
    else {
        console.log('Connecté à la base de données MySQL.');
    }    
});