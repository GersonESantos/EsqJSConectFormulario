
### o meu objetivo é aprender a usar o copilot
quero fazer um api crud
conectou ok da mensagem não conectou mensagem
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
nav#menu ul {
    list-style-type: none;
    display: flex;
    gap: 10px;
    margin-top: 10px;
}
nav#menu ul li a {
    text-decoration: none;
    color: var(--texto-inverso);
    font-weight: bold;
    padding: 12px 16px;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
}
nav#menu ul li a:hover {
    background-color: var(--destaque-inverso);
    color: var(--destaque);
}
main {
    display: grid;
    grid-template-columns: auto 90vw auto ;
    gap: 20px;
    margin-top: 20px;
}
section#ficha {
    background-color: var(--fundo-card);
    padding: 20px;
    border-radius: 4px;
    grid-column: 2;
}
section#ficha img   {
    width: 200px;
    aspect-ratio: 1/1;
    object-fit: cover;
    overflow: hidden;
    display: block;
    margin: 0 auto 20px auto;
    border-radius: 50%;
    outline: 4px solid var(--destaque);
    border: 4px solid var(--fundo-card);
    margin-bottom: 15px;
}
section#ficha h1 {
    color: var(--destaque);
    margin: 15px 0;
    font-size: 1.5em;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
}
div#social {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    gap: 2em;
    text-align: center;
    margin-top: 15px;
}
div#social a {
    color: var(--destaque);
    transition: color 0.3s;
}
div#social a:hover {
    color: var(--destaque-inverso);
}   
section#ficha h2 {
    margin-bottom: 40px;
}
section#detalhes {
    grid-column: 2;
}
article  {
    background-color: var(--fundo-card);
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;     
}
article h2 {
    color: var(--destaque);
    margin-bottom: 10px;
}
.video-container {
    position: relative;
    width: 100%;
    margin: auto;
    aspect-ratio: 16/9;
    
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
}

#skill-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}
#skill-container .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}
#skill-container .nome
{
    font-weight: bold;
    color: var(--texto);
}
#skill-container .porcent  {
    font-weight: bold;
    color: var(--destaque);
}
#skill-container .barra {
    width: 100%;
    height: 8px;
    background-color: var(--fundo-principal);
    border-radius: 4px;
   
}
#skill-container  .progresso {
    height: 100%;
    background-color: var(--destaque-inverso);
    border-radius: 4px;
    
}
#formacao-container {
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
    margin-top: 20px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
#formacao-container .curso {
    background-color: var(--fundo-principal);
    padding-left: 15px;
    border-radius: 8px;
    border: 2px solid var(--destaque);
    transition: border-width 0.5s, border-color 0.5s;
}
#formacao-container .curso:hover {
    border-left-width: 15px; ;
    border-color: var(--destaque);
    cursor: pointer;
}
#formacao-container .periodo {
    font-style: 0.9em;
    font-weight: bold;    
    color: var(--texto);
}
#formacao-container .instituicao {
    font-size: 1.2em;
    font-weight: bold;
    color: var(--destaque-inverso);
}
#projeto-container {
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
    
}
#projeto-container .projeto {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: var(--fundo-principal);
    padding: 10px;
    border-radius: 8px;
    border-left: 5px solid var(--destaque-inverso);
    transition: border-width 0.5s, border-color 0.5s;
}
#projeto-container .projeto:hover {
    border-left-width: 15px; ;
    border-color: var(--destaque);
    cursor: pointer;
}
#projeto-container .foto {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    overflow: hidden;
    border-radius: 8px;
}

@media screen and (min-width: 768px) {
    main{
        grid-template-columns: auto  auto ;
    }
     section#ficha 
     {
    grid-column: 2/3;
    height: fit-content;
    position: sticky;
    top : 65px;
    }
    section#detalhes {
    grid-column: 3/4;
    }
  #skill-container {
    grid-template-columns: 1fr 1fr;


  } 
  #projeto-container .projeto{
    flex-direction: row-reverse;
    justify-content: space-between;
    
  }
  #projeto-container .projeto-info {
    max-width: 80%;
  }
  #formacao-container .foto {
    aspect-ratio: 1/1;
    max-width: 20%;
    max-height: 200px;
    
  }
 
}
 footer{
    background-color: var(--destaque);   
    color: var(--texto-inverso);
    text-align: center;
    padding: 15px;
  }
footer a {
    color: var(--texto-inverso);
    text-decoration: none;
    font-weight: bold;
}
footer a:hover {
    text-decoration: underline;
    color: var(--destaque-inverso);
}

    
    
    
