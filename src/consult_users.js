const { MongoClient, ObjectId } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")
        const users = db.collection("users")

        let email = "lorena.alexandre@ufba.br"
        console.log("Search user by email: "+email)
        let user = await users.findOne({"email": email})
        console.log("User found by email: ")
        console.log(user)
        console.log("User friends by object id: ")
        user.amigos_ids.forEach(function (value) {
            console.log(value["$oid"])
        })
        console.log("Search friends by object id: ")
        for (const value of user.amigos_ids) {
            let id = value["$oid"]
            console.log("Search friend by id: "+id)
            let friend = await users.findOne({"_id": new ObjectId(id)})
            console.log(friend)
        }
    }finally {
        await client.close()
    }
}

run().catch(console.dir)

