const express = require('express');
const userRoutes = require('./routes/userRoutes');
const config = require('../config');
const cors = require('cors');
const pgp = require("pg-promise")({});
const database = "divide_ai_db";
const username = "postgres";
const password = "joaohhenalves"
const db = pgp(`postgres://${username}:${password}@localhost:5432/${database}`);
const app = express();
// Middleware para parsing JSON
app.use(express.json());

app.use(cors());

// Rotas
app.use('/', userRoutes);

// Inicia o servidor
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

app.post("/cadastrocomanda", async (req, res) => {
    const data = req.body;
    try {
        console.log("Inserindo no banco a comanda de ", data.nome);
        db.none(
            "INSERT INTO comanda (nome_dono, data_hora, status_comanda) VALUES ($1, $2, $3);",
            [data.nome, data.data_hora, data.status]
        );
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});