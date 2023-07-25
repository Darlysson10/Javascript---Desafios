import { DateTime } from 'luxon';
import fs from 'fs';
import GetInvalidData from './GetInvalidData.js';
import path from 'path';

function ExportJsonData(data){
    
    const pasta = path.resolve('Json');
    const arquivoSaida = path.join(pasta,'erros-' + DateTime.now().toFormat('ddMMyyyy-HHmmss') + '.json'); // formatando nome do arquivo de saída com o timestamp atual

    let clientesInvalidos = GetInvalidData(data);

    if (clientesInvalidos.length > 0) {
        try {
            fs.writeFileSync(arquivoSaida, JSON.stringify(clientesInvalidos));
        }
        catch (err) {
            console.log('Erro ao escrever arquivo de saída!');
            process.exit(1);
        }
    }
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