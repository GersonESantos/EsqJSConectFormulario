
### o meu objetivo é aprender a usar o copilot
quero fazer um api para conectar ao banco de dados
dar a mensagem de sucesso ou erro
o codigo minimo para fazer isso nao fazer outras funçoes
stack: JavaScript + HTML + CSS + sql2
dados do banco de dados:
    host: 'localhost', 
    user: 'root',
    password: 'Gabibi89*',
    port: 3306,
    database: 'formulario'
Table: usuarios
Columns:
idusuarios int AI PK 
nome varchar(45) 
email varchar(110) 
telefone varchar(15) 
sexo varchar(15) 
data_nasc date 
senha varchar(45) 
cidade varchar(45) 
estado varchar(45) 
endereco varchar(45)
    parar aqui para explicar

css:
/* 
  Variáveis para cores:
  */
:root {
  --fundo-principal: #f5f5f5;
  --texto: #222222;
  --texto-inverso: #ffffff;
  --destaque: #007BFF;
  --destaque-inverso: #88a8c9;
  --fundo-card: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: Verdana, Geneva, Tahoma, sans-serif, sans-serif;
    line-height: 1.5em;
    margin: 0;
    padding: 0;
    background-color: var(--fundo-principal);
    color: var(--texto);
}
header {
    background-color: var(--destaque);
    color: var(--texto);
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    align-content: center;
    position: sticky;
    top: 0;
    z-index: 1000;
}
