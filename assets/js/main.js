// Consulta as marcas em diferentes categorias (carros, motos, caminhões)
async function consultarMarcas(categoria) {
    let apiUrl;

    switch (categoria) {
        case 'carros':
            apiUrl = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';
            break;
        case 'motos':
            apiUrl = 'https://parallelum.com.br/fipe/api/v1/motos/marcas';
            break;
        case 'caminhoes':
            apiUrl = 'https://parallelum.com.br/fipe/api/v1/caminhoes/marcas';
            break;
        default:
            console.error('Categoria inválida:', categoria);
            return Promise.reject('Categoria inválida');
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
        throw error;
    }
};

// // Consulta os modelos em diferentes categorias (carros, motos, caminhões)

async function consultarModelos(categoria) {
    let apiUrl;

    switch (categoria) {
        case
            'carros':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMarca}/modelos`;
            break;
        case 'motos':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/motos/marcas/${selectedMarca}/modelos`;
            break;
        case
            'caminhoes':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${selectedMarca}/modelos`;
            break;
        default:
            console.error('Categoria inválida:', categoria);
            return Promise.reject('Categoria inválida');
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
        throw error;
    }
};

// // Consulta os anos em diferentes categorias (carros, motos, caminhões)

async function consultarAnos(categoria) {
    let apiUrl;

    switch (categoria) {
        case 'carros':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMarca}/modelos/${selectedModelo}/anos`;
            break;
        case 'motos':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/motos/marcas/${selectedMarca}/modelos/${selectedModelo}/anos`;
            break;
        case 'caminhoes':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${selectedMarca}/modelos/${selectedModelo}/anos`;
            break;
        default:
            console.error('Categoria inválida:', categoria);
            return Promise.reject('Categoria inválida');
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
        throw error;
    }
};

const marcaSelect = document.getElementById('marcaSelect');
const modeloSelect = document.getElementById('modeloSelect');
const anoSelect = document.getElementById('anoSelect');
const botaoConsultar = document.getElementById('buttonConsultar');
const radioInputs = document.querySelectorAll('input[name="tipoVeiculo"]');

// Captura o tipo de veículo desejado através dos radios e preenche os select's
let selectedTipoVeiculo = '';
let selectedMarca = '';
let selectedModelo = '';
let selectedAno = '';
let resultadoFipe = '';

radioInputs.forEach(radio => {
    radio.addEventListener('change', async () => {
        if (radio.checked) {
            selectedTipoVeiculo = radio.value;
            try {
                const dataVeiculos = await consultarMarcas(selectedTipoVeiculo);
                limparSelect(marcaSelect)
                limparSelect(modeloSelect);
                limparSelect(anoSelect);
                preencherSelect(marcaSelect, dataVeiculos, 'codigo', 'nome');
            } catch (error) {
                console.error(`Ocorreu um erro ao consultar as marcas:`, error);
            }
        }
    });
});

//Função para capturar a marca escolhida e disponibilizar os modelos 
marcaSelect.addEventListener('change', async () => {
    selectedMarca = marcaSelect.value;
    const modelosData = await consultarModelos(selectedTipoVeiculo);
    preencherSelect(modeloSelect, modelosData.modelos, 'codigo', 'nome');
});

//Função para capturar modelo escolhido e disponibilizar os anos 
modeloSelect.addEventListener('change', async () => {
    selectedModelo = modeloSelect.value;
    const anosData = await consultarAnos(selectedTipoVeiculo);
    preencherSelect(anoSelect, anosData, 'codigo', 'nome');
});


anoSelect.addEventListener('change', async () => {
    selectedAno = anoSelect.value;
});

// Função para preencher os select's
function preencherSelect(element, data, valueKey, textKey) {
    element.innerHTML = '';
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[valueKey];
        option.textContent = item[textKey];
        element.appendChild(option);
    });
};

// Função para limpar as opções de um select
function limparSelect(element) {
    element.innerHTML = ''; let selectedTipoVeiculo = '';
    selectedModelo = '';
    selectedAno = '';
    selectedMarca = '';
};

async function ConsultarTabelaFipe(categoria) {
    if (!selectedTipoVeiculo || !selectedMarca || !selectedModelo || !selectedAno) {
        alert('Preencha todos os campos solicitados')
    }
    let apiUrl = '';
    switch (categoria) {
        case 'carros':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMarca}/modelos/${selectedModelo}/anos/${selectedAno}`;
            break;
        case 'motos':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/motos/marcas/${selectedMarca}/modelos/${selectedModelo}/anos/${selectedAno}`;
            break;
        case 'caminhoes':
            apiUrl = `https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${selectedMarca}/modelos/${selectedModelo}/anos/${selectedAno}`;
            break;
        default:
            console.error('Categoria inválida:', categoria);
            return Promise.reject('Categoria inválida');
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        resultadoFipe = data
        preencherResultadoConsulta(resultadoFipe);
        abrirModal();
        return data;
    } catch (error) {
        console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
        throw error;
    }

};

botaoConsultar.addEventListener('click', function () {
    ConsultarTabelaFipe(selectedTipoVeiculo)
});


// Modal onde exibi o resultado da consulta 
const modal = document.getElementById("modalFipe");
const botaoFechar = document.getElementById("fechar");
function abrirModal() {
    modal.style.display = "block";
}
function fecharModal() {
    modal.style.display = "none";
}
let botaoFecharModal = document.getElementById('fecharModal');
botaoFecharModal.addEventListener('click', function () {
    fecharModal()
})

// Exibir os dados dentro do modal

function preencherResultadoConsulta(dados) {
    modalInfo.innerHTML = "";

    for (const prop in dados) {
        const detalhe = document.createElement("p");
        detalhe.classList.add("detalhe-item");
        const label = prop.replace(/([A-Z])/g, ' $1');
        const labelText = label.charAt(0).toUpperCase() + label.slice(1); // Capitaliza o primeiro caractere
        detalhe.innerHTML = `<strong class="valor-label">${labelText}:</strong> <span class="valor">${dados[prop]}</span>`;
        modalInfo.appendChild(detalhe);
    }
}

function preencherErrorConsulta(dados) {
    modalInfo.innerHTML = "";

    for (const prop in dados) {
        const detalhe = document.createElement("p");
        detalhe.classList.add("detalhe-item");
        const label = prop.replace(/([A-Z])/g, ' $1');
        const labelText = label.charAt(0).toUpperCase() + label.slice(1); // Capitaliza o primeiro caractere
        detalhe.innerHTML = `<strong class="valor-label">${labelText}:</strong> <span class="valor">${dados[prop]}</span>`;
        modalInfo.appendChild(detalhe);
    }
}


