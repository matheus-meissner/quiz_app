// Obtém o total de questões do main.js
const totalQuestions = window.totalQuestions || 140; // Usa o valor global ou um fallback padrão
let selectedMethod = null;

// Função chamada ao selecionar um método
function selectMethod(questions) {
    selectedMethod = questions; // Armazena o método selecionado

    // Salva o método no localStorage para ser acessado no main.js
    localStorage.setItem('selectedMethod', selectedMethod);

    // Calcula o número de checkpoints
    const checkpoints = calculateCheckpoints(totalQuestions, selectedMethod);

    // Atualiza o texto na modal com os checkpoints
    updateModalText(checkpoints);
    // Exibe a modal
    showModal();
}

function selectCustomMethod() {
    const customInput = document.getElementById('customQuestions'); // Obtém o input personalizado
    const customValue = parseInt(customInput.value, 10); // Converte para número inteiro

    // Verifica se o valor é válido
    if (isNaN(customValue) || customValue < 1 || customValue > totalQuestions) {
        alert(`Por favor, insira um número entre 1 e ${totalQuestions}.`);
        return;
    }

    // Chama a função selectMethod com o valor personalizado
    selectMethod(customValue);
}


// Função para calcular o número de checkpoints
function calculateCheckpoints(totalQuestions, method) {
    const numCheckpoints = Math.ceil(totalQuestions / method); // Número total de checkpoints
    const checkpoints = [];

    for (let i = 0; i < numCheckpoints; i++) {
        if (i < numCheckpoints - 1) {
            checkpoints.push(method); // Adiciona checkpoints completos
        } else {
            checkpoints.push(totalQuestions % method || method); // Último checkpoint (resto ou método completo)
        }
    }

    return checkpoints;
}

// Função para atualizar o texto na modal
function updateModalText(checkpoints) {
    const modalTextElement = document.getElementById('modal-text');
    if (modalTextElement) {
        const totalCheckpoints = checkpoints.length;
        const checkpointDetails = checkpoints.map((q, i) => `Checkpoint ${i + 1}: ${q} questões`).join('<br>');

        modalTextElement.innerHTML = `
            Serão ${totalCheckpoints} checkpoints no total:<br>
            ${checkpointDetails}
        `;
    }
}

// Função para exibir a modal
function showModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'flex'; // Torna a modal visível
    }
}

// Função para fechar a modal
function closeModal() {
    const modal = document.getElementById('modal');
    window.location.href = "simulado.html";
}

// Função para voltar à página inicial
function goBack() {
    window.location.href = "index.html"; // Ajuste o caminho conforme necessário
}
