// Função para consultar as marcas em diferentes categorias (carros, motos, caminhões)
function consultarMarcas(categoria) {
  const apiUrl = `https://parallelum.com.br/fipe/api/v1/${categoria}/marcas`;

  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => {
      console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
    });
};


// Consulta as marcas de carros
consultarMarcas('carros').then(marcasCarros => {
  preencherSelectMarcas('carros'); // Preenche o select quando as marcas de carros são consultadas
});

// Consulta as marcas de motos
consultarMarcas('motos').then(marcasMotos => {
});

// Consulta as marcas de caminhões
consultarMarcas('caminhoes').then(marcasCaminhoes => {
});

let codigoAno = '';
let codigoMarca = '';
let codigoModelo = '';

// Obtendo o código do modelo selecionada 
function consultarModelos(marca) {
  const apiUrl = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const modeloSelect = document.getElementById('modeloSelect');
      anoSelect.innerHTML = '';
      
      if (data.modelos && data.modelos.length > 0) {
        data.modelos.forEach(modeloInfo => {
          const option = document.createElement('option');
          option.value = modeloInfo.codigo;
          option.textContent = modeloInfo.nome;
          modeloSelect.appendChild(option);
        });

        // Event listener para capturar a seleção do ano
        modeloSelect.addEventListener('change', event => {
          const codigoModeloSelecionado = event.target.value;
          codigoModelo = codigoModeloSelecionado
          console.log('Código do modelo selecionado:', codigoModelo);

          consultarAnos(codigoMarca, codigoModelo)
        });
      } else {
        const option = document.createElement('option');
        option.textContent = 'Ano não disponível';
        modeloSelect.appendChild(option);
      }

      return data;
    })
    .catch(error => {
      console.error(`Ocorreu um erro ao consultar os modelos:`, error);
    });
};

// Obtendo o código da marca selecionada 
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
      let codigoMarcaSelecionada = event.target.value;
      codigoMarca = codigoMarcaSelecionada;
      console.log('Código da marca selecionado:', codigoMarca);
      consultarModelos(codigoMarcaSelecionada)
    });
  });
};

// Função para consultar os anos de um modelo de carro
function consultarAnos(marca, modelo) {
  const apiUrl = `https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca}/modelos/${modelo}/anos`;
  const anoSelect = document.getElementById('anoSelect');
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.forEach(anoInfo => {
        const option = document.createElement('option');
        option.value = anoInfo.codigo;
        option.textContent = anoInfo.nome;
        anoSelect.appendChild(option);
      });

      // Event listener para capturar a seleção do ano
      anoSelect.addEventListener('change', event => {
        const codigoAnoSelecionado = event.target.value;
        codigoAno = codigoAnoSelecionado
        console.log('Código do ano selecionado:', codigoAno);
      });
    })
    .catch(error => {
      console.error(`Ocorreu um erro ao consultar os anos do modelo:`, error);
    });
};


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

// Teste 

const buttonTeste = document.getElementById('buttonTeste');
buttonTeste.addEventListener('click', () => {
  console.log('Código do ano:' + codigoAno + 'Código da Marca:' + codigoMarca + 'Codigo do Modelo:' + codigoModelo);
});