document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.certification-card button');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const certification = event.target.parentElement.querySelector('h3').textContent;
            localStorage.setItem('selectedCertification', certification); // Salva a certificação escolhida
            window.location.href = "metodos.html"; // Redireciona para métodos
        });
    });
});


// Função para redirecionar à tela de prática
function startPractice() {
    window.location.href = "metodos.html"; // Altere para o caminho correto do simulado
}