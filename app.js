async function buscarRanking() {
    try {
        // Busca os dados da sua API que está rodando na porta 3000
        const resposta = await fetch('https://artists-site.onrender.com/ranking');
        const dados = await resposta.json();
        
        const divRanking = document.getElementById('ranking');
        
        // Limpa o texto de "Carregando..." e cria a lista vertical
        divRanking.innerHTML = `
            <div style="font-family: monospace; color: #00ff41;">
                ${dados.map(j => `
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding: 10px 0;">
                        <span>${j.user_name}</span>
                        <span>${j.score} pts</span>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (erro) {
        console.error("Erro ao carregar ranking:", erro);
        document.getElementById('ranking').innerText = "Erro ao conectar com o servidor.";
    }
}

// Inicia a busca assim que a página carregar
buscarRanking();