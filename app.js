async function buscarRanking() {
    try {
        const resposta = await fetch('https://artists-site.onrender.com/ranking');
        let dados = await resposta.json();
        
        // Ordenação de segurança no cliente (Maior score -> Maior priority)
        dados.sort((a, b) => {
            const scoreA = a.score || 0;
            const scoreB = b.score || 0;
            
            // 1º Critério: Maior score
            if (scoreB !== scoreA) {
                return scoreB - scoreA;
            }
            
            // 2º Critério (Desempate): Maior valor de priority
            const priorityA = a.priority || 0;
            const priorityB = b.priority || 0;
            
            return priorityB - priorityA;
        });

        const divRanking = document.getElementById('ranking');
        
        divRanking.innerHTML = `
            <div class="ranking-container">
            ${dados.map((j, index) => {
                // Seleciona a moldura correspondente para os primeiros 5 colocados
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
                            
                            <!-- Link contendo a bandeira e o nome do usuário -->
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
