class Agenda {
    
    #consultas;
    
    constructor() {
        this.#consultas = [];
    }

    agendarConsulta(consulta) {
        this.#consultas.push(consulta);
    }

    buscarConsulta(cpf, data, horaInicial) { // Retorna o id da consulta no array de consultas da agenda.
        for (let i = 0; i < this.#consultas.length; i++) {
            if (this.#consultas[i].cpf_paciente == cpf && this.#consultas[i].data == data && this.#consultas[i].horaInicial == horaInicial) {
                return i;
            }
        }
        return undefined;
    }

    consultasFuturasPaciente(cpf) {
        let consultas = this.#consultas;
        let consultas_futuras = [];
        for (let i = 0; i < consultas.length; i++) {
            if (consultas[i].cpf_paciente == cpf) {
                if (ValidacaoDataHora.validacaoData(consultas[i].data) == true) {
                    consultas_futuras.push(consultas[i]);
                }
            }
        }
        return consultas_futuras;
    }

    consultasPassadasPaciente(cpf) {
        let consultas = this.#consultas;
        let consultas_passadas = [];
        for (let i = 0; i < consultas.length; i++) {
            if (consultas[i].cpf_paciente == cpf) {
                if (ValidacaoDataHora.validacaoData(consultas[i].data) == false) {
                    consultas_passadas.push(consultas[i]);
                }
            }
        }
        return consultas_passadas;
    }

    cancelarAgendamento(cpf, data, horaInicial) {
        let consulta_id = this.buscarConsulta(cpf, data, horaInicial);
        this.#consultas.splice(consulta_id, 1);
    }

    deletarConsultasPaciente(cpf) {
        let consultas = this.consultasPassadasPaciente(cpf);
        for (let i = 0; i < consultas.length; i++) {
            this.cancelarAgendamento(cpf, consultas[i].data, consultas[i].horaInicial);
        }
    }

    static getAgendaToda() {
        //retorna toda a agenda ordenada por data e hora inicial
        let consultas = this.#consultas;
        consultas.sort(function (a, b) {
            return a.data.localeCompare(b.data) || a.horaInicial - b.horaInicial;
        });
        return consultas;
    }

    static getAgendaPeriodo(dataInicial, dataFinal) {
        //listagem da agenda ordenada por data e hora inicial, considerando apenas as consultas que estão dentro do período informado
        let consultas = this.getAgendaToda();
        let consultas_periodo = [];
        for (let i = 0; i < consultas.length; i++) {
            if (consultas[i].data >= dataInicial && consultas[i].data <= dataFinal) {
                consultas_periodo.push(consultas[i]);
            }
        }
        return consultas_periodo;
    }


}
module.exports = Agenda;