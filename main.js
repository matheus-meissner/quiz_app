// teste

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
}
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
}