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
}
module.exports = Consulta;