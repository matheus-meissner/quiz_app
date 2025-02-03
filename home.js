document.addEventListener('DOMContentLoaded', () => {
    const totalQuestionsElement = document.getElementById('total-questions');
    if (totalQuestionsElement && typeof totalQuestions !== 'undefined') {
        totalQuestionsElement.textContent = `Perguntas Cadastradas: ${totalQuestions}`;
    } else {
        console.error('Erro: totalQuestions não está definido ou elemento não encontrado.');
    }
});

// Função para redirecionar à tela de prática
function startPractice() {
    window.location.href = "metodos.html"; // Altere para o caminho correto do simulado
}