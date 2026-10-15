const express = require("express")
const mysql = require("mysql2/promise")
const app = express()

//Configurações do banco de dados 
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "cantina",
    waitForConnections: true
})

app.use (express.json())

app.get("/pratos", async (req, res) => {
    const [rows] = await pool.execute("SELECT * FROM pratos")
    res.json(rows)
})

app.post("/pratos", async (req,res) => {
    const { nome, descricao, preco } = req.body

    if(!nome || !descricao || !preco){
        return res.status(400).json({error:"Nome, descricao e preco são obrigatorios"})
    }

    const [resultado] = await pool.execute("INSERT INTO pratos (nome, descricao, preco) VALUES(?,?,?)", [nome, descricao, preco])
    return res.status(201).json({id: resultado.insertId, nome, descricao, preco})
})


app.delete("/pratos/:id", async (req,res) => {
    // Para pegar um param da url usa req.params
    const id = req.params.id
    const[resultado] = await pool.execute("DELETE FROM pratos WHERE id = ?", [id])

    if(resultado.affectedRows === 0){
        return res.status(404).json({ error: "Prato não encontrados"})
       }
       res.status(204).json({mensagem: "Pratos deletado com sucesso!"})
 })
 
 app.put("/pratos/:id", async(req, res) => {
    const {nome, descricao, preco} = req.body
    
    if(!nome || !descricao || !preco){
        return res.status(400).json({error: "Nome, dexcrição e preço são obrigatórios"})
    }

    const id = Number(req.params.id)

    console.log(id, nome, descricao, preco)
    const [resultado] = await pool.execute(
        "UPDATE pratos SET nome = ?, descricao = ?, preco = ? WHERE id = ?",
        [nome, descricao, preco, id]
    )

    if(resultado.affectedRows === 0){
        return res.status(404).json({ error: "Pratos não encontrado"})
    }

    return res.json({ id, nome, descricao ,preco})

})
     app.listen(3000, () => console.log("API rodando :)"))