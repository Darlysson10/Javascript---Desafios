import { DateTime } from 'luxon';
import fs from 'fs';
import GetInvalidData from './GetInvalidData.js';
import path from 'path';
import ExportJsonError from './ExportJsonError.js';
// Responsável por exportar os dados inválidos para um arquivo JSON no formato especificado
// Deveria pensar nisso como uma classe também
function ExportJsonData(data) {
    const pasta = path.resolve('Json');
    const arquivoSaida = path.join(pasta, 'erros-' + DateTime.now().toFormat('ddMMyyyy-HHmmss') + '.json');
  
    let clientesInvalidos = GetInvalidData(data);
  
    try {
      const jsonContent = clientesInvalidos.length > 0 ? JSON.stringify(clientesInvalidos) : '[]';
      fs.writeFileSync(arquivoSaida, jsonContent);
      console.log('Arquivo de saída gerado com sucesso!');
    } catch (err) {
      throw new ExportJsonError('Erro ao escrever arquivo de saída!');
    }
  }

export default ExportJsonData;