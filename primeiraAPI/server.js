// inporta a biblioteca http
const http = require("node:http")

//cria o servidor
const serve = http.createServer((req, res) => {
    if(req.url === "/senai"){
        const escolaSenai = {
            nome: "Senai Ricardo Lerner",
            telefone: "11 4618-1600",
            endereco: "Rua direita, 955 Vila Santo Antonio, Cotia - SP",
            cursos: [
                "Desenvolvimento de sistemas",
                "administração",
                "Eletromecanica"
            ]
        
        }
        res.writeHead(200, {"Concent-Type": "application/json"})
        return res.end(JSON.stringify(escolaSenai))
    }
    
    if(req.url === "/ary"){
        const escolaAry = {

            nome: "Escola Ary Buzan",
            telefone: "11 4617-4306",
            endereco: "Rua direta, 601, Vila Santo Antônio, Cotia - SP",
            modalidade: [
                "Ensino Regular",
                "Programa de Ensino Integral (PEI)"
            ]
        }
        res.writeHead(200, { "Content-Type": "application/json"})
        return res.end(JSON.stringify(escolaAry))
    }

    if(req.url === "/funcionarios"){
        const funcionarios = {
        
            Diretor: "Alexandre Augusto Reginato",
            coordenador: "Wilson Donizete Fernandes",
            aqv: "Isabel Cristina",
            instrutoresTI: [
                "Diego Pulheze",
                "Luis Carlos Simei",
                "Deocleciano Reis marthins"
            ],

            istruturesMecanica: [
                "Diego Pulheze",
                "Luis Carlos Simei",
                "Deocleciano Reis marthins"
            ]
        }
            res.writeHead(200, {"Contet-Type": "application/json"})
            return res.end(JSON.stringify(funcionarios))
    }
})

//coloca o servidor para porta 3000
serve.listen(3001, () => console.log("API rodando http://localhost:3000"))           