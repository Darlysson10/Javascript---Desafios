class Paciente {
    
    #nome;
    #cpf;
    #dataNascimento; // fazer isso para as outras classes também.

    constructor(nome, cpf, dataNascimento) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
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


}
module.exports = Paciente;