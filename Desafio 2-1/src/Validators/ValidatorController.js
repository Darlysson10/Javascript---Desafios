const ValidatorCPF = require("./ValidatorCPF");
const ValidatorName = require("./ValidatorName");
const listaClientes = require("../Classes/ListaClientes");
const GetErrors = require("../GetErrors");

function ValidatorController(clientes) {
    
    const validatorCPF = new ValidatorCPF();
    const validatorName = new ValidatorName();
    const getErrors = new GetErrors();
    
    

    for (let i = 0; i < clientes.lista.length; i++) {
        let errorData = []
        if (!validatorCPF.validarCPF(clientes.lista[i].cpf)) {
            errorData.push(getErrors.ErrorCPF());
            
        }
        if (!validatorName.validarNome(clientes.lista[i].nome)) {
            errorData.push(getErrors.ErrorName());
        }
        clientes.inserirInvalido(errorData);
        //TODO modificar o objeto cliente para ter um array de dados inválidos ao invés da classe lista
        // clientes.lista[i].inserirInvalido(errorData); Algo assim. 
        // Isso deve ser feito no momento da criação do objeto. Então antes de criar um objeto cliente, deve-se fazer uma validação.
    }


}
module.exports = ValidatorController;