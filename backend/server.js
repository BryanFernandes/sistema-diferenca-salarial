const express = require("express")

const cors = require("cors")

const app = express()

const db = require("./database")

const jwt = require("jsonwebtoken")

const SEGREDO = "meuSegredoSuperSeguro"

app.use(cors())

app.use(express.json())

function autenticar(req, res, next) {
    const token = req.headers.authorization 

    if(!token) {
        return res.status(401).send("Token não enviado")
    }

    try {
        const dados = jwt.verify(token, SEGREDO)

        req.usuario = dados

        next()
    } catch(err) {

        console.log(err)
        
        return res.status(401).send("Token Inválido")
    }
}

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

app.get("/relatorios", autenticar, (req,res) => {
    
    const usuario_id = req.usuario.id

    db.all(
        `
        SELECT * 
        FROM relatorios
        WHERE usuario_id = ?
        `,
        [usuario_id],
        (err, rows) => {
            if(err) {
                return res.status(500).send("Erro ao buscar relatóros")
            }

            res.json(rows)
        }
    )
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

app.post("/login", (req,res) => {
    const {email, senha} = req.body 
    db.get(
        `
        SELECT * 
        FROM usuarios
        WHERE email = ?
        AND senha = ?
        `, [email,senha],
        (err,row) => {
            if(err) {
                return res.status(500).send("Erro no login")
            }
            if(row) {
                const token = jwt.sign(
                    {
                        id: row.id,
                        email: row.email
                    },

                    SEGREDO,

                    {
                        expiresIn: "24h"
                    }
                )

                res.json({
                    
                    mensagem: "Login realizado com sucesso",

                    token: token
                })
            } else {
                res.send("Email ou senha inválidos")
            }
        }
    )  

})

app.post("/relatorios", autenticar, (req, res) => {

    const usuario_id = req.usuario.id


    const {
        funcionario,
        data_inicio,
        data_fim
    } = req.body 

    db.run(`INSERT INTO relatorios
        ( 
        usuario_id,
        funcionario,
        data_inicio,
        data_fim
        )
        VALUES (?,?,?,?)
        `,
    [ 
        usuario_id,
        funcionario,
        data_inicio,

    ],
    function(err) {

        if(err) {
            return res.status("Erro ao salvar relatório")
        }

        res.send("Relatório salvo com sucesso")
    }
  )
    
})


