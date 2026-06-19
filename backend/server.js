const express = require("express")

const cors = require("cors")

const app = express()

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
    res.send("Lista de usuários")
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