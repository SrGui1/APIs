//Importando a biblioteca
const express = require("express")
const app = express()


app.use(express.json())

const livros = [
    {id: 1, titulo:"Dom Casmurro", auto: "Machado de assis" },
    {id:2, titulo:"Vidas secas", auto:"Graciliano Ramos"}
]

let proximoId = 3

//Listar todos os livros
app.get("/livros", (req, res) => {
    res.json(livros)
})

app.post("/Livros", (req, res) => { 
    const {titulo, autor} = req.body

    if(!titulo || !autor){
        return res.status(400).json({erro: "titulo e autor obrigatorios"})

    }

    const novoLivro = {
        id: proximoId,
        titulo,
        autor
    }

    livros.push(novoLivro) 
    proximoId++
    res.status(201).json(novoLivro)
    
    app.get("/livros/:id", (req,res) => {
        const idInfomado = req.params.id

        const livro = livros.find(li => li.id === Number(idInfomado))

        if(!livro) {
                return res.status(404).json({ error:"Livro não encontrado"})
            }
            res.json(livro)
    })
})

app.listen(3000, () => console.log("API rodando em localhost:3000"))
