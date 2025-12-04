const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    port: 3306,
    database: 'formulario'
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
