/*
 * =========================================================
 * CONECTA FUTURO — SERVIDOR DE TESTE
 * Node.js + Express
 * =========================================================
 *
 * Instalação:
 *   1. Abra o terminal na pasta do projeto.
 *   2. Execute: npm init -y
 *   3. Execute: npm install express
 *
 * Inicialização:
 *   node servidor.js
 *
 * Acesso:
 *   http://localhost:3000
 *
 * O servidor entrega HTML, CSS, JavaScript e imagens.
 * =========================================================
 */

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// A pasta deste arquivo é usada como raiz do projeto.
const pastaProjeto = __dirname;

// Serve arquivos estáticos, como CSS, JS e imagens.
app.use(express.static(pastaProjeto));

// Rotas das páginas principais.
const paginas = {
    "/": "index.html",
    "/index.html": "index.html",
    "/cadastro": "cadastro.html",
    "/cadastro.html": "cadastro.html",
    "/login": "login.html",
    "/login.html": "login.html",
    "/informatica-basica": "informatica-basica.html",
    "/informatica-basica.html": "informatica-basica.html",
    "/ia-mercado-trabalho": "ia-mercado-trabalho.html",
    "/ia-mercado-trabalho.html": "ia-mercado-trabalho.html",
    "/primeiro-emprego": "primeiro-emprego.html",
    "/primeiro-emprego.html": "primeiro-emprego.html",
    "/carreiras-tecnologia": "carreiras-tecnologia.html",
    "/carreiras-tecnologia.html": "carreiras-tecnologia.html"
};

for (const [rota, arquivo] of Object.entries(paginas)) {
    app.get(rota, (req, res) => {
        res.sendFile(path.join(pastaProjeto, arquivo));
    });
}

// Página 404 simples.
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Página não encontrada</h1>
        <p>Verifique o endereço informado.</p>
        <p><a href="/">Voltar para o Conecta Futuro</a></p>
    `);
});

app.listen(PORT, () => {
    console.log("========================================");
    console.log("Conecta Futuro iniciado.");
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log("Pressione Ctrl + C para encerrar.");
    console.log("========================================");
});
