
const descricoes = {
    motorola: "Smartphone Motorola Moto G86 com 512GB de memória, 8GB de RAM, tela pOLED de alta resolução e câmera de 50MP.",
    samsung: "Samsung Galaxy S26 5G com 256GB de memória, 12GB de RAM, inteligência artificial Galaxy AI e câmera tripla.",
    apple: "iPhone 17 Pro Max de 256GB na cor Laranja-cósmico. Design premium, câmeras avançadas e bateria de longa duração.",
    xiaomi: "Xiaomi Poco X8 Pro com 256GB, 8GB de RAM, tela AMOLED e processador ultra rápido para jogos e aplicativos."
};



function mostrarPagina(marca) {

    const todasPaginas = document.querySelectorAll('.pagina');

    todasPaginas.forEach(pagina => {
        pagina.style.display = 'none';
    });

    const paginaClicada = document.getElementById(marca);

    if (paginaClicada) {
        paginaClicada.style.display = 'block';

        const campoTexto = paginaClicada.querySelector('#Descricao');
        if (campoTexto) {
            campoTexto.textContent = descricoes[marca];
        }
    }
}



const botoesVerDetalhes = document.querySelectorAll('#btnModal');

botoesVerDetalhes.forEach(botao => {
    botao.addEventListener('click', function() {
        const cardDoProduto = this.closest('.info');
        
        const modal = cardDoProduto.querySelector('#modal');
        
        modal.style.display = 'block';
    });
});



const botoesFechar = document.querySelectorAll('#btnFechar');

botoesFechar.forEach(botao => {
    botao.addEventListener('click', function() {
        const modal = this.closest('#modal');
        
        modal.style.display = 'none';
    });
});