// Obtém o botão e o conteúdo
const toggleButton = document.getElementById('toggleButton');
const conteudo = document.getElementById('conteudo');

// Define um estado inicial
let conteudoVisivel = false;

// Adiciona um ouvinte de evento ao botão
toggleButton.addEventListener('click', function () {
    if (conteudoVisivel) {
        conteudo.style.display = 'none'; // Oculta o conteúdo
    } else {
        conteudo.style.display = 'block'; // Torna o conteúdo visível
    }

    // Inverte o estado
    conteudoVisivel = !conteudoVisivel;
});