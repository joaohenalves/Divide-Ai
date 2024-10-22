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
        console.log("Inserindo no banco a comanda de", data.nome);
        await db.none(
            "INSERT INTO comanda (id_dono, data_hora, status_comanda, senha_comanda) VALUES ($1, CURRENT_TIMESTAMP, 1, $2);",
            [data.id_dono, data.senha_comanda]
        );
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/cadastrarusuario", async (req, res) => {
    const data = req.body;
    try {
        console.log("Inserindo no banco o usuario", data.email);
        await db.none(
            "INSERT INTO usuario (nome_usuario, email, senha) VALUES ($1, $2, crypt($3, gen_salt('bf')));",
            [data.nome_usuario, data.email, data.senha]
        );
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.put("/desativarcomanda", async (req, res) => {
    try {
        const data = parseInt(req.body.id_comanda);
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
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/selecionarcomandas", async (req, res) => {
    try {
        const id_usuario = req.body.id_usuario;
        console.log(`Recuperando dados da(s) comanda(s) do dono ${id_usuario}`);
        const result = await db.any(
            "SELECT * FROM comanda WHERE nome_dono = $1;",
            [id_usuario]
        );
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/cadastrarpartcomanda", async (req, res) => {
    const data = req.body;
    try {
        const comanda = await db.one(
            "SELECT senha_comanda FROM comanda WHERE id_comanda = $1",
            [data.id_comanda]
        );
        if(comanda.senha_comanda == data.senha_comanda) {
            console.log("Inserindo na comanda o usuario", data.id_usuario);
            await db.none(
                "INSERT INTO part_comanda (id_comanda, id_usuario) VALUES ($1, $2);",
                [data.id_comanda, data.id_usuario]
            );
            res.sendStatus(201);
        } else {
            res.sendStatus(401);
        }
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/cadastraritem", async (req, res) => {
    const data = req.body;
    try {
        console.log("Inserindo na comanda o item", data.nome_item);
        await db.none(
            "INSERT INTO item (id_comanda, nome_item, quantidade, preco) VALUES ($1, $2, $3, $4);",
            [data.id_comanda, data.nome_item, data.quantidade, data.preco]
        );
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/atualizaritem", async (req, res) => {
    const data = req.body;
    try {
        if(data.quantidade<=0){
            console.log("Deletando na comanda o item", data.nome_item);
            await db.none(
                "DELETE FROM item WHERE id_item=$1;",
                [data.id_item]
            );
        }
        else{
            console.log("Atualizando na comanda o item", data.nome_item);
            await db.none(
                "UPDATE item SET nome_item=$1, quantidade=$2, preco=$3 WHERE id_item=$4;",
                [data.nome_item, data.quantidade, data.preco, data.id_item]
            );
        }
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/deletaritem", async (req, res) => {
    const data = req.body;
    try {
        console.log("Deletando na comanda o item", data.nome_item);
        await db.none(
            "DELETE FROM item WHERE id_item=$1;",
            [data.id_item]
        );
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/validarusuario", async (req, res) => {
    try {
        const emailUsuario = req.body.email;
        const senhaUsuario = req.body.senha;
        console.log(`Recuperando dados do usuario ${emailUsuario}`);
        const result = await db.any(
            "SELECT CASE WHEN (SELECT count(id_usuario) FROM usuario WHERE email = $1 AND senha = crypt($2, senha)) >= 1 THEN 'TRUE' ELSE 'FALSE' END AS result;",
            [emailUsuario,senhaUsuario]
        );
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.delete("/removerpartitem", async (req, res) => {
    const data = req.body;
    try {
        console.log(`Removendo a pessoa ${data.id_usuario} do item ${data.id_item}`);
        await db.none(
            "DELETE FROM part_item WHERE id_item = $1 AND id_usuario = $2;",
            [data.id_item, data.id_usuario]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/cadastrarpartitem", async (req, res) => {
    const data = req.body;
    try {
        console.log(`Inserindo a participação do usuário ${data.id_usuario} no item ${data.id_item}`);
        await db.none(
            "INSERT INTO part_item (id_item, id_usuario) VALUES ($1, $2);",
            [data.id_item, data.id_usuario]
        );
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.delete("/removerpartcomanda", async (req, res) => {
    const data = req.body;
    try {
        console.log(`Removendo a pessoa ${data.id_usuario} da comanda ${data.id_comanda}`);
        await db.none(
            "DELETE FROM part_comanda WHERE id_comanda = $1 AND id_usuario = $2;",
            [data.id_comanda, data.id_usuario]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
