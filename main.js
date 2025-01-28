// Função para gerar checkpoints dinamicamente
function generateCheckpoints(totalQuestions, groupSize = 50) {
    const checkpoints = [];
    let currentTotal = 0;

    // Adiciona checkpoints em grupos de "groupSize"
    while (currentTotal + groupSize < totalQuestions) {
        currentTotal += groupSize;
        checkpoints.push(currentTotal);
    }

    // Adiciona o último grupo com o número restante
    checkpoints.push(totalQuestions);

    return checkpoints;
}

let currentCheckpointIndex = 0; // Índice do checkpoint atual
const totalQuestions = 140; // Altere para o número total de perguntas
const ultima_questao = totalQuestions; // Define a última questão
const checkpoints = generateCheckpoints(totalQuestions); // Gera os checkpoints dinamicamente

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

function navigateQuestion(direction) {
    const questionElement = document.querySelector('.question');
    const answersElement = document.querySelector('.answers');
    const toggleButton = document.getElementById('toggle-answer'); // Seleciona o botão do cabeçalho
    
    // Atualiza o índice da pergunta atual
    currentQuestion += direction;
    console.log(currentQuestion);

    // Evita ir além dos limites
    if (currentQuestion < 1) currentQuestion = 1;
    if (currentQuestion > ultima_questao) currentQuestion = ultima_questao;

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

    // Redefine a pergunta para a 1ª do checkpoint atual
    const checkpointStart = checkpoints[currentCheckpointIndex - 1] || 1;
    currentQuestion = checkpointStart;

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

    // Verifica se o estudante avançou para além do checkpoint atual
    if (currentQuestion === checkpointLimit + 1 && currentCheckpointIndex < checkpoints.length - 1) {
        currentCheckpointIndex++; // Avança para o próximo checkpoint
        markCheckpoint(checkpointLimit); // Marca a checkbox
        resetProgressForNextCheckpoint(); // Reseta para o próximo conjunto
    }

    // Verifica se está na última questão e se o botão "Avançar" foi clicado na última pergunta
    if (currentQuestion === ultima_questao && currentCheckpointIndex === checkpoints.length - 1) {
        markCheckpoint(ultima_questao); // Marca o último checkpoint
    }
}
function markCheckpoint(limit) {
    const checkbox = document.querySelector(`#checkpoint-${limit}`);
    if (checkbox) {
        checkbox.checked = true;
        alert(`Parabéns! Você concluiu as perguntas de ${limit - (limit % 50 || 49)} a ${limit}.`);
    } else {
        console.warn(`Checkpoint não encontrado para o limite ${limit}. Verifique o ID do elemento.`);
    }
}
function resetProgressForNextCheckpoint() {
    if (currentCheckpointIndex < checkpoints.length) {
        currentQuestion = checkpoints[currentCheckpointIndex - 1] + 1;
        updateProgressBar();
    }
}
