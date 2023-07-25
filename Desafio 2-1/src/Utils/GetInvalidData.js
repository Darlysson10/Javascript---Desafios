import ValidaCliente from '../Classes/ValidaCliente.js';
//Pega os dados inválidos retornados na classe ValidacaoCliente e retorna um array com os dados inválidos para serem enviados ao json de saída
function GetInvalidData(data) {
    let clientesInvalidos = [];
    let clientes = data;
    for (let cliente of clientes) {
        let validacao = new ValidaCliente(cliente);
        let erros = validacao.validaCliente();
        if (erros.length > 0) {
            clientesInvalidos.push({ "dados": cliente, "erros": erros });
        }
    }
    return clientesInvalidos;
}
export default GetInvalidData;