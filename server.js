const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chat_app'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const sql = `SELECT * FROM messages`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('chat', { messages: results });
    });
});

app.post('/message', (req, res) => {
    const { user_id, message } = req.body;
    const insertQuery = `INSERT INTO messages (user_id, message) VALUES (?, ?)`;
    db.query(insertQuery, [user_id, message], (err, results) => {
      if (err) throw err;
      res.redirect('/');
    });
});

app.listen(port, () => {
    console.log('Server is running');
});