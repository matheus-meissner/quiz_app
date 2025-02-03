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
function renderCheckpoints(checkpoints) {
    const container = document.getElementById('checkpoints-container');

    if (!container) {
        console.error('Container de checkpoints não encontrado!');
        return;
    }

    container.innerHTML = ''; // Limpa o conteúdo existente

    checkpoints.forEach((limit, index) => {
        const checkpointNumber = index + 1;

        // Cria o elemento de checkpoint
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" id="checkpoint-${limit}" />
            Checkpoint ${checkpointNumber}
        `;

        // Adiciona evento de clique à checkbox para levar à primeira pergunta do próximo checkpoint
        const checkbox = label.querySelector(`#checkpoint-${limit}`);
        checkbox.addEventListener('click', () => handleCheckpointClick(limit, index));

        // Adiciona ao container
        container.appendChild(label);
    });
}

function handleCheckpointClick(limit, index) {
    const checkbox = document.querySelector(`#checkpoint-${limit}`);

    if (checkbox.checked) {
        // ✅ Se o estudante marcou o checkpoint, avança para o próximo intervalo
        markCheckpoint(limit);
        currentCheckpointIndex = index + 1;
        currentQuestion = checkpoints[currentCheckpointIndex - 1] + 1 || totalQuestions;

        // 🔥 Marcar automaticamente todos os checkpoints anteriores
        for (let i = 0; i <= index; i++) {
            markCheckpoint(checkpoints[i]);
        }
    } else {
        // 🔥 Se o estudante desmarcou, volta para o início do checkpoint anterior corretamente
        unmarkCheckpoint(limit);
        currentCheckpointIndex = index; // Mantém o índice correto

        // Define a primeira pergunta do checkpoint anterior
        currentQuestion = currentCheckpointIndex > 0 ? checkpoints[currentCheckpointIndex - 1] + 1 : 1;

        // 🔥 Desmarcar automaticamente todos os checkpoints seguintes
        for (let i = index + 1; i < checkpoints.length; i++) {
            unmarkCheckpoint(checkpoints[i]);
        }
    }

    // Atualiza a interface
    document.querySelector('.question h2').innerText = `Pergunta ${currentQuestion}`;
    document.querySelector('.question img').src = `/img/pergunta_${currentQuestion}.jpg`;
    document.querySelector('.question img').alt = `Pergunta ${currentQuestion}`;
    document.querySelector('.answers img').src = `/img/resposta_${currentQuestion}.jpg`;
    document.querySelector('.answers img').alt = `Resposta ${currentQuestion}`;

    // Atualiza a barra de progresso
    updateProgressBar();
}
let currentCheckpointIndex = 0; // Índice do checkpoint atual
const totalQuestions = 140; // Altere para o número total de perguntas
const ultima_questao = totalQuestions; // Define a última questão
const checkpoints = generateCheckpoints(totalQuestions); // Gera os checkpoints dinamicamente
renderCheckpoints(checkpoints); // Renderiza os checkpoints no HTML

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

    // Valida se os elementos foram encontrados
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

    // 🔥 Atualiza o índice do checkpoint corretamente
    for (let i = 0; i < checkpoints.length; i++) {
        if (currentQuestion <= checkpoints[i]) {
            currentCheckpointIndex = i;
            break;
        }
    }

    // Atualiza o conteúdo da pergunta e resposta
    questionElement.querySelector('h2').innerText = `Pergunta ${currentQuestion}`;
    questionElement.querySelector('img').src = `/img/pergunta_${currentQuestion}.jpg`;
    questionElement.querySelector('img').alt = `Pergunta ${currentQuestion}`;

    answersElement.querySelector('img').src = `/img/resposta_${currentQuestion}.jpg`;
    answersElement.querySelector('img').alt = `Resposta ${currentQuestion}`;

    // Atualiza a barra de progresso
    updateProgressBar();

    // 🔥 Agora os checkpoints são atualizados corretamente ao pesquisar
    checkCheckpoint();
}



function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');

    // Determina o intervalo correto para o progresso
    let checkpointStart = 1;
    let checkpointEnd = checkpoints[0]; // Inicializa como o primeiro checkpoint

    for (let i = 0; i < checkpoints.length; i++) {
        if (currentQuestion > checkpoints[i]) {
            checkpointStart = checkpoints[i]; // Último checkpoint ultrapassado
            checkpointEnd = checkpoints[i + 1] || totalQuestions; // Próximo checkpoint ou total de questões
        }
    }

    // Calcula o progresso dentro do intervalo correto
    let progressPercentage = ((currentQuestion - checkpointStart + 1) / (checkpointEnd - checkpointStart + 1)) * 100;

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

    // 🔥 Corrigindo para pegar a PRIMEIRA pergunta do checkpoint atual
    const checkpointStart = checkpoints[currentCheckpointIndex - 1] ? checkpoints[currentCheckpointIndex - 1] + 1 : 1;
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

    // 🔥 Reseta o progresso corretamente
    updateProgressBar();
}


function checkCheckpoint() {
    checkpoints.forEach((limit, index) => {
        if (currentQuestion > limit) {
            markCheckpoint(limit); // Marca o checkpoint se passou
            currentCheckpointIndex = index + 1; // Atualiza o índice do checkpoint atual
        } else {
            unmarkCheckpoint(limit); // Desmarca o checkpoint se voltou
        }
    });

    updateProgressBar(); // Atualiza a barra de progresso
}

function unmarkCheckpoint(limit) {
    const checkbox = document.querySelector(`#checkpoint-${limit}`);

    if (checkbox && checkbox.checked) { // Só desmarca se estiver marcado
        checkbox.checked = false;
    }
}


function markCheckpoint(limit) {
    const checkbox = document.querySelector(`#checkpoint-${limit}`);

    if (checkbox && !checkbox.checked) { // Só marca se ainda não estiver marcado
        checkbox.checked = true;
        alert(`Parabéns! Você passou da questão ${limit} e o checkpoint foi marcado.`);
    }
}

function resetProgressForNextCheckpoint() {
    if (currentCheckpointIndex < checkpoints.length) {
        currentQuestion = checkpoints[currentCheckpointIndex - 1] + 1;
        updateProgressBar();
    }
}
