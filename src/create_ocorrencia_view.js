const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")

        await db.createCollection("ocorrenciasIbio", {
            viewOn: "ocorrencias",
            pipeline: [
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [-13.0014756,-38.5082636]
                        },
                        distanceField: "distancia",
                        spherical: true,
                        maxDistance: 1000
                    }
                },
                {
                    $project: {
                        usuario_id: false,
                        notificar_para: false,
                        lista_de_amigos: false
                    }
                }
            ]
        });
    }finally {
        await client.close()
    }
}

run().catch(console.dir)

