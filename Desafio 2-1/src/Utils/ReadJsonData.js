import fs from 'fs';
import ValidacaoArquivo from '../Classes/ValidacaoArquivo.js';
function ReadJsonData (){
    const arquivoEntrada = process.argv[2]; // Pega o nome do arquivo de entrada pelo comando
    let clientes = [];
    let validacaoArquivo = new ValidacaoArquivo(arquivoEntrada);
    if (!validacaoArquivo.validaArquivo()) {
        console.log('Arquivo inválido!');
        process.exit(1);
    }
    try {
        clientes = JSON.parse(fs.readFileSync(arquivoEntrada)); // Cria um array de clientes com os dados do arquivo de entrada
    }
    catch (err) {
        console.log('Erro ao ler arquivo de entrada!');
        process.exit(1);
    }
    return clientes; // Retorna os dados para serem utilizados na validação
}
export default ReadJsonData;