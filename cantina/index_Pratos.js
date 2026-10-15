const express = require("express")
const app = express()
app.use(express.json())


const pratos =[
    {id:1, nome:"Esfiha", descrição:"Esfiha de ricota com espinafre", preço:7.00},
    {id:2, nome:"Brownie", descrição:"Brownie de chocolate com doce e leite", preço:9.00}
    
]

let proximoId = 3


app.get("/pratos",(req,res) => {
    res.json(pratos)
})

app.post("/pratos",(req,res) =>{
    const{nome,descricao,preco} = req.body

    if(!nome || !descricao || !preco){
    return res.status(400).json({erro: "nome, descrição e preço obrigatorios"})
    }
    const novoPratos = {
        id: proximoId,
        nome,
        descricao,
        preco
    }
    pratos.push(novoPratos)
    proximoId++
    res.status(201).json(novoPratos)
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


app.listen(3003,() => console.log("API rodando em localhost:3003"))
