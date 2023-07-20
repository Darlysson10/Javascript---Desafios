const ProcessJson = require("./JsonManager/ProcessJson");
const listaClientes = require("./Classes/ListaClientes");
const validatorController = require("./Validators/ValidatorController");   
// let cpf = "12345678901";
// let cpfValidator = new ValidatorCPF();
// console.log(cpfValidator.validarCPF(cpf));

const processJson = new ProcessJson();
const json = processJson.JsonInputter();
const clientes = processJson.JsonToObj(json);
validatorController(clientes);
console.log(clientes.listar());






//TODO: Função para criar um objeto cliente e armazenar em uma lista de clientes. A função deve navegar pelo array do json lido e ir criando os objetos clientes e armazenando na lista de clientes.
