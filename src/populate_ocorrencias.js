const { MongoClient, ObjectId } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

function getRandomDate(start, end) {
    const startDate = start.getTime();
    const endDate = end.getTime();

    const randomTime = Math.random() * (endDate - startDate) + startDate;
    return new Date(randomTime);
}

async function run() {
    try {
        const db = client.db("ssa")
        const users = db.collection("users")
        const ocorrencias = db.collection("ocorrencias")

        let startDate = new Date('2022-01-01');
        let endDate = new Date('2023-05-31');

        for(let i = 0; i < 2000000; i++) {
            let user = await users.aggregate([
                { "$sample": {"size": 1} }
            ]).next()
            let userId = user["_id"]

            const coordinates = [
                -13.0014756 + (((Math.random() * 10) - 5)/100.0),
                -38.5082636 + (((Math.random() * 10) - 5)/100.0)
            ];

            const randomDate = getRandomDate(startDate, endDate);

            const ocorrencia = {
                usuario_id: new ObjectId(userId),
                localizacao: {
                    type: 'Point',
                    coordinates,
                },
                data_hora: randomDate,
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

