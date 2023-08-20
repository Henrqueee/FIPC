// Função para consultar as marcas em diferentes categorias (carros, motos, caminhões)
function consultarMarcas(categoria) {
  const apiUrl = `https://parallelum.com.br/fipe/api/v1/${categoria}/marcas`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
    });
}

// Obtendo o código da marca selecionada 

let codigoMarcaSelecionada = '';

function preencherSelectMarcas(categoria) {
  const selectMarcas = document.getElementById('marcaSelect');

  consultarMarcas(categoria).then(marcas => {
    selectMarcas.innerHTML = '';

    marcas.forEach(marca => {
      const option = document.createElement('option');
      option.value = marca.codigo;
      option.textContent = marca.nome;
      selectMarcas.appendChild(option);
    });

    // Event listener para capturar a seleção da marca e solicitar os modelos
    selectMarcas.addEventListener('change', event => {
      codigoMarcaSelecionada = event.target.value;
      console.log(codigoMarcaSelecionada)
    });
  });
}

// Consulta as marcas de carros
consultarMarcas('carros').then(marcasCarros => {
  console.log('Marcas de Carros:', marcasCarros);
  preencherSelectMarcas('carros'); // Preenche o select quando as marcas de carros são consultadas
});

// Consulta as marcas de motos
consultarMarcas('motos').then(marcasMotos => {
  console.log('Marcas de Motos:', marcasMotos);
});

// Consulta as marcas de caminhões
consultarMarcas('caminhoes').then(marcasCaminhoes => {
  console.log('Marcas de Caminhões:', marcasCaminhoes);
});

// Event listener para a seleção do tipo de veículo
document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="tipoVeiculo"]');
  const formSelecaoMarca = document.getElementById('formSelecaoMarca');

  radios.forEach(radio => {
    radio.addEventListener('change', event => {
      const categoriaSelecionada = event.target.value;
      preencherSelectMarcas(categoriaSelecionada);
      if (radio.checked) {
        formSelecaoMarca.style.display = 'block';
      } else {
        formSelecaoMarca.style.display = 'none';
      }

    });
  });
});

console.log(codigoMarcaSelecionada)