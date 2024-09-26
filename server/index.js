// const userRoutes = require('./routes/userRoutes');
const express = require('express');
const config = require('../config');
const cors = require('cors');
const pgp = require('pg-promise')({});
const db = pgp(`postgres://${config.dbConfig.user}:${config.dbConfig.password}@localhost:5432/${config.dbConfig.database}`);
const app = express();
// Middleware para parsing JSON
app.use(express.json());

app.use(cors());

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

app.post("/cadastrarcomanda", async (req, res) => {
    const data = req.body;
    try {
        console.log("Inserindo no banco a comanda de ", data.nome);
        await db.none(
            "INSERT INTO comanda (nome_dono, data_hora, status_comanda) VALUES ($1, CURRENT_TIMESTAMP, 1);",
            [data.nome]
        );
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.put("/desativarcomanda", async (req, res) => {
    try {
        const data = parseInt(req.body.idComanda);
        console.log(`Mudando o status da comanda id ${data}`);
        await db.none(
            "UPDATE comanda SET status_comanda = 0 WHERE id = $1;",
            [data]
        );
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    } 
});

app.put("/alterarcomanda", async (req, res) => {
    try {
        const data = req.body;
        const colunas = ["empty", "nome_dono = $2", "status_comanda = $3"];
        let campos = "";
        let index = 0;
        for(let v in data) {
            if(index > 0) {
                if(v != "") {
                    campos += (campos != "" ? ", " : "") + colunas[index];
                }
            }
            index++;
        }
        console.log(`Alterando a comanda de id ${data.id}`);
        await db.none(
            `UPDATE comanda SET ${campos} WHERE id = $1`,
            [data.id, data.nome, data.status]
        );
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/selecionarcomandas", async (req, res) => {
    try {
        const nomeDono = req.query.nome;
        console.log(`Recuperando dados da(s) comanda(s) do dono ${nomeDono}`);
        const result = await db.any(
            "SELECT * FROM comanda WHERE nome_dono = $1;",
            [nomeDono]
        );
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});