const express = require('express');
const userRoutes = require('./routes/userRoutes');
const config = require('../config');
const cors = require('cors');
const pgp = require("pg-promise")({});
const database = "divide_ai_db";
const username = "postgres";
const password = "joaohenalves"
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
        await db.none(
            "INSERT INTO comanda (nome_dono, data_hora, status_comanda) VALUES ($1, CURRENT_TIMESTAMP, 1);",
            [data.nome]
        );
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.delete("/apagarcomanda", async (req, res) => {
    try {
        const data = parseInt(req.body.idComanda);
        console.log(`Apagando a comanda id ${data}`);
        await db.none(
            "DELETE FROM comanda WHERE id = $1;",
            [data]
        );
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    } 
});

app.put("/alterarcomanda", async (req, res) => {
    try {
        const data = req.body;
        const colunas = ["empty", "nome = $2", "status = $3"];
        let campos;
        let index = 0;
        for(let v in data) {
            if(index > 0) {
                campos += (campos != "" ? ", " : "") + colunas[index];
            }
            index++;
        }
        console.log(`Alterando a comanda de id ${data.id}`);
        await db.none(
            `UPDATE comanda SET ${campos} WHERE id = $1`,
            [data.id, data.nome, data.status]
        );
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/selecionacomanda", async (req, res) => {
    try {
        const data = req.body;
        console.log(`Recuperando dados da comanda ${data.id}`)
        const result = await db.any(
            "SELECT * FROM comanda WHERE id = $1;",
            [data.id]
        );
        res.json(result).status(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});