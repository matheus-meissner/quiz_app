function toggleAnswer() {
    const answers = document.querySelector('.answers');
    const toggleButton = document.getElementById('toggle-answer');

    // Verifica se o elemento foi encontrado
    if (!answers || !toggleButton) {
        console.error("Elemento '.answers' ou '#toggle-answer' não encontrado.");
        return;
    }

    // Verifica o estado atual e alterna
    if (answers.style.display === 'block') {
        answers.style.display = 'none';
        toggleButton.innerText = 'Ver Resposta';
        toggleButton.style.backgroundColor = '#4caf50'; // Verde para "Ver Resposta"
        toggleButton.style.width = '120px';
    } else {
        answers.style.display = 'block';
        toggleButton.innerText = 'Desabilitar';
        toggleButton.style.backgroundColor = '#f44336'; // Vermelho para "Desabilitar"
        toggleButton.style.width = '120px';
    }
}

let currentQuestion = 1; // Começa na pergunta 1
const totalQuestions = 10; // Altere para o número total de perguntas

function navigateQuestion(direction) {
    const questionElement = document.querySelector('.question');
    const answersElement = document.querySelector('.answers');
    
    // Atualiza o índice da pergunta atual
    currentQuestion += direction;

    // Evita ir além dos limites
    if (currentQuestion < 1) currentQuestion = 1;
    if (currentQuestion > totalQuestions) currentQuestion = totalQuestions;

    // Atualiza o conteúdo da pergunta e resposta (substitua as imagens pelo formato correspondente)
    questionElement.querySelector('h2').innerText = `Pergunta ${currentQuestion}`;
    questionElement.querySelector('img').src = `/img/pergunta_${currentQuestion}.jpg`;
    questionElement.querySelector('img').alt = `Pergunta ${currentQuestion}`;
    
    answersElement.querySelector('img').src = `/img/resposta_${currentQuestion}.jpg`;
    answersElement.querySelector('img').alt = `Resposta ${currentQuestion}`;
}
