const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../view")));
app.use("/dados", express.static(path.join(__dirname, "../dados")));
app.use("/scripts", express.static(path.join(__dirname, "../scripts")));

const BASE_PATH = path.join(__dirname, "../scripts");


app.post("/salvar-ex", (req, res) => {
    try {
        const caminho = path.join(BASE_PATH, "trocaEX.js");
        const conteudo = `const trocaEX = ${JSON.stringify(req.body, null, 4)};`;

        fs.writeFileSync(caminho, conteudo);
        res.send("OK");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});


app.post("/salvar-agrupamentos", (req, res) => {
    try {
        const caminho = path.join(BASE_PATH, "agrupamentos.js");
        const conteudo = `const agrupamentos = ${JSON.stringify(req.body, null, 4)};`;

        fs.writeFileSync(caminho, conteudo);
        res.send("OK");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});


app.post("/salvar-grupos", (req, res) => {
    try {
        const caminho = path.join(BASE_PATH, "grupos.js");

        const conteudoFinal = `const grupos = ${JSON.stringify(req.body, null, 4)};`;

        fs.writeFileSync(caminho, conteudoFinal);

        res.send("OK");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});