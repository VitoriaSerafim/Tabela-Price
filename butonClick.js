// Obtém o botão e o conteúdo
const submitButton = document.getElementById('submitButton');
const result = document.getElementById('result');
const goBack = document.getElementById('goBackBtn');

// Define um estado inicial
let visibilidade = false;

// Adiciona um ouvinte de evento ao botão
submitButton.addEventListener('click', function () {
    if (visibilidade) {
        result.style.display = 'none'; // Oculta o conteúdo
        goBack.style.display = 'none'; // Oculta o conteúdo
    } else {
        result.style.display = 'block'; // Torna o conteúdo visível
        goBack.style.display = 'block'; // Torna o conteúdo visível
    }
    // Inverte o estado
    visibilidade = !visibilidade;
});