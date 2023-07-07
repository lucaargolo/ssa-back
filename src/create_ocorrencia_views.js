const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")

        await db.createCollection("ocorrenciasOndina", {
            viewOn: "ocorrencias",
            pipeline: [
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [-13.0011546,-38.5085237]
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

        await db.createCollection("ocorrenciasSaoLazaro", {
            viewOn: "ocorrencias",
            pipeline: [
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [-13.005483, -38.513378]
                        },
                        distanceField: "distancia",
                        spherical: true,
                        maxDistance: 250
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

        await db.createCollection("ocorrenciasCanela", {
            viewOn: "ocorrencias",
            pipeline: [
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [-12.994489,-38.5204962]
                        },
                        distanceField: "distancia",
                        spherical: true,
                        maxDistance: 250
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

