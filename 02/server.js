require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME
};

// Rota para testar a conexão
app.get('/api/status', (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err);
            res.status(500).json({
                status: 'error',
                message: 'Erro ao conectar ao banco de dados',
                details: err.message
            });
            return;
        }

        res.json({
            status: 'success',
            message: 'Conexão com o banco de dados estabelecida com sucesso!'
        });

        connection.end();
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
