

CREATE TABLE usuarios (
    idusuarios INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(110) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    sexo VARCHAR(15),
    data_nasc DATE,
    senha VARCHAR(45) NOT NULL,
    cidade VARCHAR(45),
    estado VARCHAR(45),
    endereco VARCHAR(45)
);
