async function buscarRanking() {
    try {
        // Busca os dados da sua API no Render
        const resposta = await fetch('https://artists-site.onrender.com/ranking');
        const dados = await resposta.json();
        
        const divRanking = document.getElementById('ranking');
        
        // Gera o HTML do ranking com as imagens dos sprites
        // No seu app.js, simplifique a div principal:
        divRanking.innerHTML = `
            <div style="color: #ffffff;">
                ${dados.map(j => `
                    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #333; padding: 15px 0; font-size: 12px;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <img src="sprites/avatar/${j.user_name}.png" 
                                onerror="this.style.display='none'" 
                                alt="${j.user_name}" 
                                style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; image-rendering: pixelated;">
                            <span>${j.user_name}</span>
                        </div>
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