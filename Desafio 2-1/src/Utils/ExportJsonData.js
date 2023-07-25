import { DateTime } from 'luxon';
import fs from 'fs';
import GetInvalidData from './GetInvalidData.js';
import path from 'path';
// Responsável por exportar os dados inválidos para um arquivo JSON no formato especificado
function ExportJsonData(data){
    
    const pasta = path.resolve('Json');
    const arquivoSaida = path.join(pasta,'erros-' + DateTime.now().toFormat('ddMMyyyy-HHmmss') + '.json'); // formatando nome do arquivo de saída com o timestamp atual
    // Pega os dados dos clientes com erros
    let clientesInvalidos = GetInvalidData(data);
    //Escreve os erros, se existir
    if (clientesInvalidos.length > 0) {
        try {
            fs.writeFileSync(arquivoSaida, JSON.stringify(clientesInvalidos));
        }
        catch (err) {
            console.log('Erro ao escrever arquivo de saída!');
            process.exit(1);
        }
    }
    // Se não existir erros, cria um arquivo vazio
    else {
        try {
            fs.writeFileSync(arquivoSaida, JSON.stringify([]));
        }
        catch (err) {
            console.log('Erro ao escrever arquivo de saída!');
            process.exit(1);
        }
    }
    console.log('Arquivo de saída gerado com sucesso!');
}

export default ExportJsonData;