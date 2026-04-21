async function buscarRanking() {
    try {
        const resposta = await fetch('https://artists-site.onrender.com/ranking');
        const dados = await resposta.json();
        
        const divRanking = document.getElementById('ranking');
        
        divRanking.innerHTML = `
            <div class="ranking-container">
                ${dados.map(j => `
                    <div class="jogador-item">
                        <div class="jogador-info">
                            <img src="sprites/avatar/${j.user_name.toLowerCase()}.png" 
                                 onerror="this.onerror=null; this.src='sprites/avatar/${j.user_name}.png'" 
                                 alt="${j.user_name}" 
                                 class="avatar">
                            <span class="nome">${j.user_name}</span>
                        </div>
                        <span class="pontos">${j.score}<span class="pts"> pts</span></span>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (erro) {
        console.error("Erro ao carregar ranking:", erro);
        document.getElementById('ranking').innerText = "Erro ao conectar com o servidor.";
    }
}

buscarRanking();