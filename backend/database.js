const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./banco.db")

db.serialize(() => {
    
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT,
        email TEXT, 
        senha TEXT
        )
    `)

    db.run(`CREATE TABLE IF NOT EXISTS relatorios (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        usuario_id INTEGER,
        funcionario TEXT,
        data_inicio TEXT,
        data_fim TEXT,
        
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        )
        
    `)

})

module.exports = db