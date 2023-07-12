const { DateTime } = require("luxon");
class Paciente {
    
    #nome;
    #cpf;
    #dataNascimento;
    #idade;

    constructor(nome, cpf, dataNascimento, idade) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
        this.#idade = idade
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    get idade() {
        return this.#idade;
    }


    calcularIdade(dataNascimento) {
        return DateTime.now().diff(DateTime.fromISO(dataNascimento), 'years').years;
    }



}
module.exports = Paciente;