class Consulta {
    
    #cpf_paciente;
    #data;
    #horaInicial;
    #horaFinal;
    #tempo;
    #nome;
    #dataNascimento;

    constructor(cpf_paciente, data,horaInicial, horaFinal, tempo, nome, dataNascimento) {
        this.#cpf_paciente = cpf_paciente;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#tempo = tempo;
        //Dados do paciente
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;

    }

    get cpf_paciente() {
        return this.#cpf_paciente;
    }

    get data() {
        return this.#data;
    }

    get horaInicial() {
        return this.#horaInicial;
    }

    get horaFinal() {
        return this.#horaFinal;
    }

    get tempo() {
        return this.#tempo;
    }

    get nome() {
        return this.#nome;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    
}
module.exports = Consulta;