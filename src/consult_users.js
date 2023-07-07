const { MongoClient, ObjectId } = require("mongodb")
const readline = require("readline-sync")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run(email) {
    try {
        const db = client.db("ssa")
        const users = db.collection("users")

        console.log("Pesquisando usuário com email: "+email)
        let user = await users.findOne({"email": email})
        if(user) {
            console.log("Usuário encontrado: ")
            console.log(user)

            console.log("Id dos amigos do usuário: ")
            user.amigos_ids.forEach(function (value) {
                console.log(value)
            })

            console.log("Pesquisando amigos do usuário por id: ")
            for (const value of user.amigos_ids) {
                console.log("Pesquisando usuário com id: " + value)
                let friend = await users.findOne({"_id": value})
                console.log(friend)
            }
        }else{
            console.log("Não foi possível encontrar um usuário com esse email.")
        }
    }finally {
        await client.close()
    }
}

run(readline.question("Digite o email que deseja consultar: ")).catch(console.dir)

