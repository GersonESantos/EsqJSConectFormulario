document.addEventListener('DOMContentLoaded', () => {
    const statusContainer = document.getElementById('status-container');
    const checkBtn = document.getElementById('check-btn');

    async function checkConnection() {
        statusContainer.innerHTML = '<p>Verificando conexão...</p>';
        statusContainer.className = ''; // Reset classes

        try {
            const response = await fetch('http://localhost:3000/api/status');
            const data = await response.json();

            if (data.status === 'success') {
                statusContainer.innerHTML = `<p class="success">${data.message}</p>`;
            } else {
                statusContainer.innerHTML = `<p class="error">Erro: ${data.message}</p><p class="error">${data.details || ''}</p>`;
            }
        } catch (error) {
            console.error('Erro ao buscar status:', error);
            statusContainer.innerHTML = `<p class="error">Erro ao conectar com a API.</p><p class="error">Verifique se o servidor está rodando.</p>`;
        }
    }

    // Verificar ao carregar a página
    checkConnection();

    // Verificar ao clicar no botão
    checkBtn.addEventListener('click', checkConnection);
});
