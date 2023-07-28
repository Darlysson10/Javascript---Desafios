import fs from 'fs';
import ValidacaoArquivo from '../Classes/ValidacaoArquivo.js';
import ReadJsonError from './ReadJsonError.js';
// Deveria pensar nisso como uma classe também
function ReadJsonData() {
    const arquivoEntrada = process.argv[2];
    let clientes = [];
    let validacaoArquivo = new ValidacaoArquivo(arquivoEntrada); // Pega o nome do arquivo de entrada pelo comando
    
    if (!validacaoArquivo.validaArquivo()) {
      console.log('Arquivo inválido!');
    }
  
    try {
      clientes = JSON.parse(fs.readFileSync(arquivoEntrada)); // Cria um array de clientes com os dados do arquivo de entrada
       //Deveria separar a leitura do arquivo com a transformação dos json
    } catch (err) {
      throw new ReadJsonError('Erro ao ler arquivo de entrada!');
    }
  
    return clientes;  // Retorna os dados para serem utilizados na validação
  }
  
export default ReadJsonData;