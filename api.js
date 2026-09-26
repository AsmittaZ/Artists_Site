const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors()); // Permite que o frontend acesse esta API

const uri = process.env.MONGODB_URI;

app.get('/ranking', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('discord_bot');
        
        // Consulta no MongoDB:
        // 1º Critério: score (decrescente: -1) -> Maior pontuação primeiro
        // 2º Critério: priority (crescente: 1)  -> Menor valor de prioridade desempata primeiro (ex: 0 ganha de 1)
        const ranking = await db.collection('users')
            .find({})
            .sort({ 
                score: -1,     // Maior score primeiro
                priority: 1    // Menor prioridade primeiro
            })
            .toArray();
            
        console.log("Enviando para o site: " + ranking.length + " jogadores.");
        res.json(ranking);
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao buscar dados");
    } finally {
        await client.close();
    }
});

// A porta 3000 é usada caso a variável de ambiente PORT não esteja definida
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API rodando na porta ' + port));
