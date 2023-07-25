import ReadJsonData from './Utils/ReadJsonData.js';
import ExportJsonData from './Utils/ExportJsonData.js';
// Aqui é a função principal onde chama as funções de ler e exportar os dados
// Inicialize no console utilizando node index.js ./Json/arquivoEntrada.json, dentro da pasta src.
(function () {

   let clientes = ReadJsonData();
   ExportJsonData(clientes);
   process.exit(0);
})();