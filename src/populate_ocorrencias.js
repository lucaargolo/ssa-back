const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")
        const users = db.collection("users")
        const ocorrencias = db.collection("ocorrencias")

        let email = "lorena.alexandre@ufba.br"
        let user = await users.findOne({"email": email})
        let userId = user["_id"]

        for(let i = 0; i < 10; i++) {
            const coordinates = [
                (Math.random() * 40 - 20),
                (Math.random() * 40 - 20)
            ];

            const ocorrencia = {
                usuario_id: {
                    $oid: userId
                },
                localizacao: {
                    type: 'Point',
                    coordinates,
                },
                data_hora: new Date().toISOString(),
                notificar_para: "Amigos",
                lista_de_amigos: user.amigos_ids,
            };

            let insert = await ocorrencias.insertOne(ocorrencia)
            console.log(insert)
        }

    }finally {
        await client.close()
    }
}

run().catch(console.dir)

