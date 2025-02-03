// Variável para armazenar o método de estudo escolhido
let selectedMethod = null;

// Função chamada ao selecionar um método
function selectMethod(questions) {
    selectedMethod = questions; // Armazena o método selecionado
    showModal(); // Exibe a modal
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
        modal.style.display = 'none'; // Oculta a modal
    }
}

// Função para voltar à página inicial
function goBack() {
    window.location.href = "index.html"; // Ajuste o caminho conforme necessário
}
