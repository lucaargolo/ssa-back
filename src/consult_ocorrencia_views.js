const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {

        const db = client.db("ssa")
        const ocorrenciasOndina = db.collection("ocorrenciasOndina")
        const ocorrenciasSaoLazaro = db.collection("ocorrenciasSaoLazaro")
        const ocorrenciasCanela = db.collection("ocorrenciasCanela")

        console.log("----[ Ocorrências Ondina ]----")
        const cursorOndina = ocorrenciasOndina.find();
        await cursorOndina.forEach((occurrence) => {
            console.log(occurrence);
        });

        console.log("----[ Ocorrências São Lazaro ]----")
        const cursorSaoLazaro = ocorrenciasSaoLazaro.find();
        await cursorSaoLazaro.forEach((occurrence) => {
            console.log(occurrence);
        });

        console.log("----[ Ocorrências Canela ]----")
        const cursorCanela = ocorrenciasCanela.find();
        await cursorCanela.forEach((occurrence) => {
            console.log(occurrence);
        });

    }finally {
        await client.close()
    }
}

run().catch(console.dir)

