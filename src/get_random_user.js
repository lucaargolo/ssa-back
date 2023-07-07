const { MongoClient, ObjectId } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")
        const users = db.collection("users")

        let user = await users.aggregate([
            { "$sample": {"size": 1} }
        ]).next()

        console.log("Usuário aleatório: ")
        console.log(user)
    }finally {
        await client.close()
    }
}

run().catch(console.dir)

