// No seu arquivo api.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors()); // Isso é fundamental para o site conseguir "ler" o seu servidor

const uri = process.env.MONGODB_URI;

app.get('/ranking', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('discord_bot');
        
        // 1. Apontando para a coleção correta: 'users'
        // 2. Ordenando pelo campo correto: 'score'
        const ranking = await db.collection('users')
            .find({})
            .sort({ score: -1 })
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

// A porta 3000 é usada apenas se o serviço online não definir uma
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API rodando na porta ' + port));