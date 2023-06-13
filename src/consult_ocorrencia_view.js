const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")
        const ocorrenciasIbio = db.collection("ocorrenciasIbio")

        const cursor = ocorrenciasIbio.find();
        await cursor.forEach((occurrence) => {
            console.log(occurrence);
        });

    }finally {
        await client.close()
    }
}

run().catch(console.dir)

