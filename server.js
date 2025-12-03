const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files (index.html, style.css, script.js)

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    port: 3306,
    database: 'formulario'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// API Endpoint to create a user
app.post('/api/usuarios', (req, res) => {
    const { nome, email, telefone, sexo, data_nasc, senha, cidade, estado, endereco } = req.body;

    const sql = `INSERT INTO usuarios (nome, email, telefone, sexo, data_nasc, senha, cidade, estado, endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nome, email, telefone, sexo, data_nasc, senha, cidade, estado, endereco];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
        } else {
            console.log('Usuário cadastrado com sucesso:', result);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        }
    });
});

// API Endpoint to list all users
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

// API Endpoint to update a user
app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, sexo, data_nasc, senha, cidade, estado, endereco } = req.body;

    const sql = `UPDATE usuarios SET nome = ?, email = ?, telefone = ?, sexo = ?, data_nasc = ?, senha = ?, cidade = ?, estado = ?, endereco = ? WHERE idusuarios = ?`;
    const values = [nome, email, telefone, sexo, data_nasc, senha, cidade, estado, endereco, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).json({ message: 'Erro ao atualizar usuário', error: err });
        } else {
            res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
        }
    });
});

// API Endpoint to delete a user
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE idusuarios = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err);
            res.status(500).json({ message: 'Erro ao deletar usuário', error: err });
        } else {
            res.status(200).json({ message: 'Usuário deletado com sucesso!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
