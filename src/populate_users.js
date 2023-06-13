const { MongoClient, ObjectId } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

const leite = require("leite")
let pessoa = leite().pessoa

const fs = require('fs')
let rawdata = fs.readFileSync('../resources/cursos.json')
let cursos = JSON.parse(rawdata)

async function run() {
    try {
        const db = client.db("ssa")
        const users = db.collection("users")

        let inserted = []
        for(let i = 0; i < 1000; i++) {
            let nome = pessoa.primeiroNome()
            let sobrenome = pessoa.sobrenome()
            let curso = cursos[Math.floor(Math.random()*cursos.length)]
            let email = (nome + ' ' + sobrenome).split(' ').join('.').toLowerCase() + "@ufba.br"
            let senha = (Math.random() + 1).toString(36).substring(2)
            let amigos = []
            let amigos_ids = []
            for(let r = 0; r < Math.floor(Math.random()*4); r++) {
                let amigo = inserted[Math.floor(Math.random()*inserted.length)]
                if(amigos.indexOf(amigo) === -1) {
                    amigos.push(amigo)
                    amigos_ids.push(new ObjectId(amigo))
                }
            }
            let user = {
                "nome": nome,
                "sobrenome": sobrenome,
                "curso": curso,
                "email": email,
                "senha": senha,
                "imagem_perfil": null,
                "localizacao": null,
                "notificar_para": "Todos",
                "receber_notificacao": "Amigos",
                "amigos_ids": amigos_ids
            }
            console.log(user)
            let insert = await users.insertOne(user)
            console.log(insert)
            inserted.push(insert.insertedId.toHexString())
        }

    }finally {
        await client.close()
    }
}

run().catch(console.dir)

