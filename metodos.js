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
    const modalTitleElement = document.getElementById('modal-title'); // Seleciona o elemento do título
    const modalDetailsElement = document.getElementById('modal-details'); // Seleciona o elemento dos detalhes

    if (modalTitleElement && modalDetailsElement) {
        const totalCheckpoints = checkpoints.length; // Número total de checkpoints

        // Atualiza o título
        modalTitleElement.textContent = `Serão ${totalCheckpoints} checkpoints no total`;

        let detailsHTML = '';

        // Caso tenha 1 ou 2 checkpoints, segue o padrão antigo (lista separada)
        if (totalCheckpoints <= 2) {
            detailsHTML = checkpoints
                .map((q, i) => `<p>Checkpoint ${i + 1}: ${q} Questões</p>`)
                .join('');
        } else {
            // Para mais de 2 checkpoints, exibe o formato consolidado
            const regularCheckpoints = totalCheckpoints - 1; // Total de checkpoints regulares
            const regularQuestions = checkpoints[0]; // Número de questões em checkpoints regulares
            const lastCheckpointQuestions = checkpoints[checkpoints.length - 1]; // Questões do último checkpoint

            if (regularCheckpoints > 0) {
                detailsHTML += `<p>Checkpoints de 1 a ${regularCheckpoints}: ${regularQuestions} Questões</p>`;
            }
            detailsHTML += `<p>Checkpoint ${totalCheckpoints}: ${lastCheckpointQuestions} Questões</p>`;
        }

        // Atualiza os detalhes da modal
        modalDetailsElement.innerHTML = detailsHTML;
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
    if (modal) {
        modal.style.display = 'none'; // Torna a modal invisível
    }
}
function irSimulado() {
    window.location.href = "simulado.html";
}
function agendarExame() {
    window.location.href = "https://esi.microsoft.com", "_blank";
}
function goBack() {
    window.location.href = "index.html";
}
