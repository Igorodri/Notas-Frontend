// Seleciona todos os elementos com a classe 'janela' e 'area_titulo_aba'
const windowElements = document.querySelectorAll('.janela');
const headers = document.querySelectorAll('.area_titulo_aba');

// Função que será chamada para adicionar a funcionalidade de arrastar a cada janela
headers.forEach((header, index) => {
    const windowElement = windowElements[index];

    // Variáveis para armazenar a posição inicial do mouse e da janela
    let offsetX, offsetY, isDragging = false;

    // Função que será chamada ao clicar no cabeçalho
    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        // Obtém a posição do mouse em relação à janela
        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;
        
        // Adiciona um evento de "mousemove" ao movimento do mouse
        document.addEventListener('mousemove', moveWindow);
        
        // Adiciona um evento de "mouseup" para parar de mover
        document.addEventListener('mouseup', stopDragging);
    });

    // Função para mover a janela
    function moveWindow(e) {
        if (isDragging) {
            // Calcula a nova posição da janela
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            // Define a posição da janela
            windowElement.style.left = `${newX}px`;
            windowElement.style.top = `${newY}px`;
        }
    }

    // Função para parar de arrastar
    function stopDragging() {
        isDragging = false;
        document.removeEventListener('mousemove', moveWindow);
        document.removeEventListener('mouseup', stopDragging);
    }
});
