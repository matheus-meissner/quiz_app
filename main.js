let checkpoints = [50, 100, 150]; // Pontos de checkpoint
let currentCheckpointIndex = 0; // Índice do checkpoint atual

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
const totalQuestions = 150; // Altere para o número total de perguntas

function navigateQuestion(direction) {
    const questionElement = document.querySelector('.question');
    const answersElement = document.querySelector('.answers');
    const toggleButton = document.getElementById('toggle-answer'); // Seleciona o botão do cabeçalho
    
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

    // Redefine o botão do cabeçalho para "Ver Resposta"
    answersElement.style.display = 'none'; // Esconde as respostas
    toggleButton.innerText = 'Ver Resposta';
    toggleButton.style.backgroundColor = '#4caf50'; // Cor verde para "Ver Resposta"
    toggleButton.style.width = '120px'; // Garante que a largura seja consistente

    // Atualiza a barra de progresso
    updateProgressBar();

    // Verifica o checkpoint
    checkCheckpoint();
}
// Inicializa a barra de progresso
updateProgressBar();

function goToQuestion() {
    const questionInput = document.getElementById('question-input');
    const questionElement = document.querySelector('.question');
    const answersElement = document.querySelector('.answers');
    const toggleButton = document.getElementById('toggle-answer');

    // Valida se o elemento foi encontrado
    if (!questionInput || !questionElement || !answersElement || !toggleButton) {
        console.error("Um ou mais elementos necessários não foram encontrados.");
        return;
    }

    // Obtém o valor do input e converte para número
    const targetQuestion = parseInt(questionInput.value, 10);

    // Valida o número inserido
    if (isNaN(targetQuestion) || targetQuestion < 1 || targetQuestion > totalQuestions) {
        alert(`Por favor, insira um número entre 1 e ${totalQuestions}.`);
        return;
    }

    // Atualiza a pergunta atual
    currentQuestion = targetQuestion;

    // Atualiza o conteúdo da pergunta e resposta
    questionElement.querySelector('h2').innerText = `Pergunta ${currentQuestion}`;
    questionElement.querySelector('img').src = `/img/pergunta_${currentQuestion}.jpg`;
    questionElement.querySelector('img').alt = `Pergunta ${currentQuestion}`;

    answersElement.querySelector('img').src = `/img/resposta_${currentQuestion}.jpg`;
    answersElement.querySelector('img').alt = `Resposta ${currentQuestion}`;

    // Atualiza a barra de progresso
    updateProgressBar();
}
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const checkpointStart = checkpoints[currentCheckpointIndex - 1] || 1; // Início do intervalo
    const checkpointEnd = checkpoints[currentCheckpointIndex] || totalQuestions; // Fim do intervalo

    const progressPercentage = ((currentQuestion - checkpointStart + 1) / (checkpointEnd - checkpointStart + 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}
function resetToFirstQuestion() {
    const questionElement = document.querySelector('.question');
    const answersElement = document.querySelector('.answers');
    const toggleButton = document.getElementById('toggle-answer');

    // Valida se os elementos foram encontrados
    if (!questionElement || !answersElement || !toggleButton) {
        console.error("Um ou mais elementos necessários não foram encontrados.");
        return;
    }

    // Redefine a pergunta para a 1ª
    currentQuestion = 1;

    // Atualiza o conteúdo da pergunta e resposta
    questionElement.querySelector('h2').innerText = `Pergunta ${currentQuestion}`;
    questionElement.querySelector('img').src = `/img/pergunta_${currentQuestion}.jpg`;
    questionElement.querySelector('img').alt = `Pergunta ${currentQuestion}`;
    
    answersElement.querySelector('img').src = `/img/resposta_${currentQuestion}.jpg`;
    answersElement.querySelector('img').alt = `Resposta ${currentQuestion}`;

    // Esconde a resposta e redefine o botão de resposta
    answersElement.style.display = 'none';
    toggleButton.innerText = 'Ver Resposta';
    toggleButton.style.backgroundColor = '#4caf50'; // Verde para "Ver Resposta"
    toggleButton.style.width = '120px';

    // Atualiza a barra de progresso
    updateProgressBar();
}
function checkCheckpoint() {
    const checkpointLimit = checkpoints[currentCheckpointIndex];

    // Se o usuário atingir o checkpoint atual
    if (currentQuestion === checkpointLimit) {
        currentCheckpointIndex++; // Avança para o próximo checkpoint
        markCheckpoint(checkpointLimit); // Marca a checkbox
        resetProgressForNextCheckpoint(); // Reseta para o próximo conjunto
    }
}
function markCheckpoint(limit) {
    const checkbox = document.querySelector(`#checkpoint-${limit}`);
    if (checkbox) {
        checkbox.checked = true;
        alert(`Parabéns! Você concluiu as perguntas de ${limit - 49} a ${limit}.`);
    }
}
function resetProgressForNextCheckpoint() {
    if (currentCheckpointIndex < checkpoints.length) {
        currentQuestion = checkpoints[currentCheckpointIndex - 1] + 1;
        updateProgressBar();
    }
}
