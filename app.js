async function buscarRanking() {
    try {
        const resposta = await fetch('https://artists-site.onrender.com/ranking');
        const dados = await resposta.json();
        
        const divRanking = document.getElementById('ranking');
        
        divRanking.innerHTML = `
            <div class="ranking-container">
            ${dados.map((j, index) => {
                // Se o rank for entre 1 e 5, usa o arquivo correspondente
                // Caso contrário, usa 'rank-default.png' (substitua pelo nome da sua moldura padrão)
                const moldura = (index < 5) ? `rank-${index + 1}.png` : 'rank-geral.png';

                return `
                    <div class="jogador-item rank-${index + 1}">
                        <!-- LADO ESQUERDO: Grupo de Identidade -->
                        <div class="jogador-identidade">
                            <div class="avatar-borda-wrapper">
                                <a href="${j.user_name.toLowerCase()}.html" target="_blank" rel="noopener noreferrer" class="avatar-link">
                                    <img src="sprites/avatar/${j.user_name.toLowerCase()}.png"
                                        onerror="this.onerror=null; this.src='sprites/avatar/${j.user_name}.png'"
                                        alt="${j.user_name}" class="avatar">
                                </a>
                                <img src="sprites/avatar/${moldura}" class="borda-moldura" alt="borda">
                            </div>
                            
                            <!-- O link agora engloba a bandeira e o nome -->
                            <a class="link-rc dados-texto" href="${j.profile_link}" target="_blank">
                                <img src="sprites/flags/${j.nationality.toLowerCase()}.png" 
                                    alt="${j.nationality}" 
                                    title="${j.nationality.toUpperCase()}" 
                                    class="flag">
                                <span class="nome">${j.user_name}</span>
                            </a>
                        </div>

                        <!-- LADO DIREITO: Pontuação -->
                        <div class="jogador-pontos">
                            <span class="pontos">${j.score}<span class="pts"> pts</span></span>
                        </div>
                    </div>
                `;
            }).join('')}
            </div>
        `;
    } catch (erro) {
        console.error("Erro ao carregar ranking:", erro);
        document.getElementById('ranking').innerText = "Erro ao conectar com o servidor.";
    }
}

buscarRanking();