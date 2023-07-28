import ReadJsonData from './Utils/ReadJsonData.js';
import ExportJsonData from './Utils/ExportJsonData.js';
// Aqui é a função principal onde chama as funções de ler e exportar os dados
// Inicialize no console utilizando node index.js ./Json/arquivoEntrada.json, dentro da pasta src.
(function () {

   try {
      let clientes = ReadJsonData();
      ExportJsonData(clientes);
    } catch (error) {
      console.error('Ocorreu um erro:', error.message);
      // Aqui você pode tomar outras ações, como registrar o erro em um arquivo de log, enviar um e-mail de notificação, etc.
    } finally {
      process.exit(0);
    }
})();