// Descrições personalizadas para cada marca/celular
const descricoesSmartphones = {
    motorola: "Smartphone Motorola Moto G86 com 512GB e 8GB RAM, Tela 1.5K pOLED, Câmera Sony 50MP com estabilização óptica (OIS), Moto AI e proteção IP68 + IP69.",
    samsung: "Samsung Galaxy S26 5G de 256GB e 12GB RAM, tecnologia Galaxy AI integrada, Câmera Tripla de 50+12+10MP e tela Dynamic AMOLED de 6.3''.",
    apple: "iPhone 17 Pro Max de 256GB na cor Laranja-cósmico. Design premium em titânio, tela de alta taxa de atualização e desempenho incomparável.",
    xiaomi: "Xiaomi Poco X8 Pro 256GB e 8GB RAM na cor White. Tela AMOLED de 6.59'', processador Dimensity 8500 Ultra e conexão Dual SIM 5G."
};


function mostrarPagina(marca) {
    const paginas = document.querySelectorAll('.pagina');
    paginas.forEach(pagina => pagina.style.display = 'none');

    const paginaAtiva = document.getElementById(marca);
    if (paginaAtiva) {
        paginaAtiva.style.display = 'block';

        const pDescricao = paginaAtiva.querySelector('#Descricao');
        if (pDescricao && descricoesSmartphones[marca]) {
            pDescricao.textContent = descricoesSmartphones[marca];
        }

        paginaAtiva.scrollIntoView({ behavior: 'smooth' });
    }
}


document.addEventListener('DOMContentLoaded', () => {

    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    document.body.appendChild(overlay);

    const botoesModal = document.querySelectorAll('[id="btnModal"]');
    botoesModal.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const cardInfo = e.target.closest('.info');
            const modal = cardInfo.querySelector('[id="modal"]');
            if (modal) {
                modal.classList.add('ativo');
                overlay.classList.add('ativo');
            }
        });
    });

    const botoesFechar = document.querySelectorAll('[id="btnFechar"]');
    botoesFechar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const modal = e.target.closest('[id="modal"]');
            if (modal) {
                modal.classList.remove('ativo');
                overlay.classList.remove('ativo');
            }
        });
    });

    overlay.addEventListener('click', () => {
        const modaisAtivos = document.querySelectorAll('.modal-conteudo.ativo');
        modaisAtivos.forEach(modal => modal.classList.remove('ativo'));
        overlay.classList.remove('ativo');
    });
});