
const Cliente = require("./Classes/Cliente");
const JsonInputOutput = require("./JsonManager/JsonInputOutput");

// let cpf = "12345678901";
// let cpfValidator = new ValidatorCPF();
// console.log(cpfValidator.validarCPF(cpf));

const jsonInputOutput = new JsonInputOutput();
const json = jsonInputOutput.JsonInputter();
console.log(json[0]);
//TODO: Função para criar um objeto cliente e armazenar em uma lista de clientes. A função deve navegar pelo array do json lido e ir criando os objetos clientes e armazenando na lista de clientes.
