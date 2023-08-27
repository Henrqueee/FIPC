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
      .then( data => {
        console.log(data)
      })
      .catch(error => {
          console.error(`Ocorreu um erro ao consultar as marcas de ${categoria}:`, error);
      });
}

consultarMarcas('motos')
