CREATE IF NOT EXISTS DATABASE divide_ai_db;

\c divide_ai_db

CREATE TABLE IF NOT EXISTS comanda (
    id SERIAL,
    nome_dono VARCHAR NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    status_comanda INTEGER NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id)
);