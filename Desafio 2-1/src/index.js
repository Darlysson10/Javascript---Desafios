const ValidatorCPF = require("./Validators/ValidatorCPF");

let cpf = "12345678901";
let cpfValidator = new ValidatorCPF();
console.log(cpfValidator.validarCPF(cpf));