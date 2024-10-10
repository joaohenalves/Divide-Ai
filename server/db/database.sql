CREATE DATABASE divide_ai_db;

\c divide_ai_db

DROP TABLE IF EXISTS comanda;
DROP TABLE IF EXISTS usuario;

CREATE TABLE comanda (
    id_comanda SERIAL,
    id_dono INTEGER NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    status_comanda INTEGER NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id_comanda),
    CONSTRAINT fk_id_dono FOREIGN KEY (id_dono) REFERENCES usuario(id_usuario)
);

CREATE TABLE usuario (
    id_usuario SERIAL,
    nome_usuario VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    senha VARCHAR NOT NULL,
    CONSTRAINT pk_id_usuario PRIMARY KEY (id_usuario),
    CONSTRAINT uk_email UNIQUE (email)
);