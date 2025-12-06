// require('dotenv').config(); // Temporariamente desabilitado para o teste
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco de dados (usando credenciais diretas)
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Gabibi89*',
    port: 3306,
    database: 'formulario'
};

// Conexão com o banco de dados
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Erro detalhado ao conectar ao banco de dados:', JSON.stringify(err, null, 2));
        // Vamos tentar forçar o processo a não sair para podermos ver o erro na API
        // return; 
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    }
});

// Adicionando um listener para erros de conexão que podem ocorrer depois
connection.on('error', function(err) {
    console.error('Erro de conexão (evento on error):', JSON.stringify(err, null, 2));
});

// Rota para testar a conexão
app.get('/api/status', (req, res) => {
    // Usando connection.ping() para uma verificação em tempo real
    connection.ping((err) => {
        if (err) {
            console.error('Falha no ping da conexão:', JSON.stringify(err, null, 2));
            return res.status(500).json({
                status: 'error',
                message: 'A conexão com o banco de dados falhou no ping.',
                details: err.message
            });
        }
        
        res.json({
            status: 'success',
            message: 'Conexão com o banco de dados está ativa!'
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
