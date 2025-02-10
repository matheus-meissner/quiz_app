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

let scheduleStartDate = 'today'; // Variável para controlar o início das datas

function updateSchedule(start) {
    scheduleStartDate = start; // Atualiza o início (hoje ou amanhã)
    const checkpoints = JSON.parse(localStorage.getItem('checkpoints')); // Recupera os checkpoints
    if (checkpoints) {
        updateModalText(checkpoints); // Recalcula as datas com base na escolha
    }
}

// Função para atualizar o texto na modal
function updateModalText(checkpoints) {
    localStorage.setItem('checkpoints', JSON.stringify(checkpoints));
    const modalTitleElement = document.getElementById('modal-title'); // Seleciona o elemento do título
    const modalDetailsElement = document.getElementById('modal-details'); // Seleciona o elemento dos detalhes
    const studyDaysElement = document.getElementById('study-days'); // Seleciona o elemento para os dias de estudo
    const scheduleDetailsElement = document.getElementById('schedule-details'); // Seleciona o elemento do cronograma
    const examDateElement = document.getElementById('exam-date'); // Seleciona o elemento da data do exame

    if (
        modalTitleElement &&
        modalDetailsElement &&
        studyDaysElement &&
        scheduleDetailsElement &&
        examDateElement
    ) {
        const totalCheckpoints = checkpoints.length; // Número total de checkpoints
        const totalDays = totalCheckpoints + 1; // Total de dias de estudo (checkpoints + revisão)

        // Atualiza o título
        modalTitleElement.textContent = `Serão ${totalCheckpoints} checkpoints no total`;

        // Atualiza os detalhes dos checkpoints
        let detailsHTML = '';
        if (totalCheckpoints <= 2) {
            detailsHTML = checkpoints
                .map(
                    (q, i) =>
                        `<p>Checkpoint <b>${i + 1}</b>: <b><i>${q} Questões</i></b></p>`
                )
                .join('');
        } else {
            const regularCheckpoints = totalCheckpoints - 1;
            const regularQuestions = checkpoints[0];
            const lastCheckpointQuestions = checkpoints[checkpoints.length - 1];

            if (regularCheckpoints > 0) {
                detailsHTML += `<p>Checkpoints de <b>1</b> a <b>${regularCheckpoints}</b>: <b><i>${regularQuestions} Questões</i></b></p>`;
            }
            detailsHTML += `<p>Checkpoint <b>${totalCheckpoints}</b>: <b><i>${lastCheckpointQuestions} Questões</i></b></p>`;
        }
        modalDetailsElement.innerHTML = detailsHTML;

        // Atualiza o total de dias de estudo
        studyDaysElement.textContent = `Totalizando ${totalDays} dias de estudo`;

        // Gera o cronograma de datas
        const today = new Date(); // Data atual
        if (scheduleStartDate === 'tomorrow') {
            today.setDate(today.getDate() + 1); // Ajusta a data inicial para amanhã
        }

        let scheduleHTML = '';
        checkpoints.forEach((_, i) => {
            const checkpointDate = new Date(today);
            checkpointDate.setDate(today.getDate() + i); // Adiciona dias para cada checkpoint
            scheduleHTML += `<p><b>${formatDate(checkpointDate)}</b> - <i>Checkpoint ${i + 1}</i></p>`;
        });

        // Adiciona a data de revisão completa
        const reviewDate = new Date(today);
        reviewDate.setDate(today.getDate() + totalCheckpoints);
        scheduleHTML += `<p><b>${formatDate(reviewDate)}</b> - <i>Revisão Completa</b></p>`;
        scheduleDetailsElement.innerHTML = scheduleHTML;

        // Define a data sugerida para o exame
        const examDate = new Date(reviewDate);
        examDate.setDate(reviewDate.getDate() + 1);
        examDateElement.textContent = `🏆${formatDate(examDate)}🏆`;
    }
}

// Função para formatar datas no estilo DD/MM
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
    return `${day}/${month}`;
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
    const selectedCertification = localStorage.getItem('selectedCertification');

    if (selectedCertification === "AI-102") {
        window.location.href = "ai_102.html"; // Substitua pelo nome correto do arquivo do simulado
    } else if (selectedCertification === "AI-900") {
        window.location.href = "ai_900.html"; // Substitua pelo nome correto do arquivo do simulado
    } else {
        alert("Erro: Nenhuma certificação selecionada.");
        window.location.href = "index.html"; // Volta à tela inicial caso haja erro
    }
}

function agendarExame() {
    window.location.href = "https://esi.microsoft.com", "_blank";
}
function goBack() {
    window.location.href = "index.html";
}
