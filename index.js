const express = require("express")
const mysql = require("mysql2/promise")
const app = express()

app.use(express.json())

const bd = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "plataforma"
})

app.get("/jogos", async(req, res) => {
    const[jogos] = await bd.execute("SELECT * FROM jogos")
    return res.json(jogos)
})

app.get("/genero", async(req, res) => {
    const [genero] = await bd.execute("SELECT * FROM genero")
    return res.json(genero)
})

app.post("/jogos", async(req, res) => {
    const {nome, desenvolvedora, sinopse, genero_id} = req.body
    
    if(!nome || !desenvolvedora || !sinopse || !genero_id){
        return res.status(400).json({error: "Conclua todas as informações"})
    }

    const [registros] = await bd.execute(
        "INSERT INTO jogos(nome, desenvolvedora, sinopse, genero_id) VALUES (?,?,?,?)",
        [nome, desenvolvedora, sinopse, genero_id]
    )

    return res.status(201).json({id: registros.insertId, nome, desenvolvedora, sinopse, genero_id})
})

app.post("/genero", async(req, res) => {
    const {nome, descricao} = req.body

    if(!nome || !descricao) {
        return res.status(400).json({error:"Conclua todas as informações"})
    }

    const [listaG] = await bd.execute(
        "INSERT INTO genero(nome, descricao) VALUES (?,?)",
        [nome, descricao]
    )
    return res.status(201).json({id: listaG.insertId, nome, descricao})
})

app.put("/jogos/:id", async(req, res) => {
    const {nome, desenvolvedora, sinopse, genero_id} = req.body

    if(!nome || !desenvolvedora || !sinopse || !genero_id) {
        return res.status(400).json({error:"Todas as informações necessarias"})
    }
    const id = req.params.id
    const [resultado] = await bd.execute(
        "UPDATE jogos SET nome = ?, desenvolvedora = ?, sinopse = ?, genero_id = ? WHERE id = ?",
        [nome, desenvolvedora, sinopse, genero_id, id   ]
    )

    if(resultado.affectedRows === 0){
        return (res.status(404).json ({error:"Jogo não encontrado!"}))
    }
    return res.json({nome, desenvolvedora, sinopse, genero_id})
})


app.get("/jogos/:id", async (req, res) => {
    const id = req.params.id
    const [jogo] = await bd.execute("SELECT * FROM jogos WHERE id = ?", [id])

    if (jogo.length === 0) {
        return res.status(404).json({ error: "Jogo não encontrado" })
    }

    return res.status(200).json(jogo[0])
})




app.listen(3005, () => console.log("API no ar"))