class Consulta {
    
    #cpf_paciente;
    #data;
    #horaInicial;
    #horaFinal;

    constructor(cpf_paciente, data,horaInicial, horaFinal) {
        this.#cpf_paciente = cpf_paciente;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;

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
    
}
module.exports = Consulta;