const ValidatorCPF = require("./ValidatorCPF");
const ValidatorName = require("./ValidatorName");
const ListaClientes = require("../Classes/ListaClientes");

function ValidatorController(clientes) {
    
    const validatorCPF = new ValidatorCPF();
    const validatorName = new ValidatorName();



}
module.exports = ValidatorController;