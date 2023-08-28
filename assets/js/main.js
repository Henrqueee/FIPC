// Função para consultar as marcas em diferentes categorias (carros, motos, caminhões)
function consultarMarcas(categoria) {
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

  return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
          console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
      });
}

// Captura o tipo de veículo desejado através dos radios e preenche os select's
const radioInputs = document.querySelectorAll('input[name="tipoVeiculo"]');
let selectedTipoVeiculo = null;

radioInputs.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            selectedTipoVeiculo = radio.value;
            consultarMarcas(selectedTipoVeiculo).then(dataVeiculos => {
              console.log(dataVeiculos);
              preencherSelect(marcaSelect, dataVeiculos, 'codigo', 'nome') 
            })
        }
    });
});

// Função para preencher os select
const marcaSelect = document.getElementById('marcaSelect');
const modeloSelect = document.getElementById('modeloSelect');
const anoSelect = document.getElementById('anoSelect');
const buttonConsultar = document.getElementById('buttonConsultar');

function preencherSelect(element, data, valueKey, textKey) {
    element.innerHTML = '';
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item[valueKey];
        option.textContent = item[textKey];
        element.appendChild(option);
    });
}