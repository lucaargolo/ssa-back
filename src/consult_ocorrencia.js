const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")
        const ocorrencias = db.collection("ocorrencias")

        const query = {
            localizacao: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [-1.8353, -10.6215]
                    },
                    $maxDistance: 5000
                }
            }
        };

        const cursor = ocorrencias.find(query);
        await cursor.forEach((occurrence) => {
            console.log(occurrence);
        });
    }finally {
        await client.close()
    }
}

run().catch(console.dir)

