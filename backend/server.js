const express = require("express")

const cors = require("cors")

const app = express()

const db = require("./database")

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Página inicial")
})

app.post("/teste", (req, res) => {
    console.log(req.body)

    res.send("Dados recebidos!")
})

app.get("/usuarios", (req,res) => {
    db.all(
        "SELECT * FROM usuarios",
        [],
        (err,rows) => {

            if(err) {
                return res.status(500).send("Erro ao buscar usuários")
            }

            res.json(rows)
        }
    )
})

app.get("/relatorios", (req,res) => {
    res.send("Lista de relatórios")
})

app.get("/login", (req,res) => {
    res.send("Fazer login")
})

app.listen(3000, () => {
    console.log("Servidor rodando")
})

app.post("/cadastro", (req,res) => {
    const {nome, email, senha} = req.body
    db.run(
        `INSERT INTO usuarios (nome, email, senha)
        VALUES (?,?,?)
        `,
        [nome, email, senha],
        function(err) {
            if (err) {
                return res.status(500).send("Erro ao cadastrar")
            }

            res.send("Usuário cadastrado com sucesso")
        }
    )
})