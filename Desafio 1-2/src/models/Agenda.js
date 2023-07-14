const ValidacaoDataHora = require('./ValidacaoDataHora');
    // A classe Agenda é responsável por armazenar as consultas agendadas. Ela deve ter um método para agendar uma nova consulta e outros para listar as consultas de um paciente, listar todas as consultas em um determinado período e cancelar uma consulta.
class Agenda {

    #consultas;
    
    constructor() {
        this.#consultas = [];
    }

    agendarConsulta(consulta) {
        this.#consultas.push(consulta);
    }
    //Função que retorna o id da consulta no array de consultas da agenda. Usada para cancelar agendamento e validações.
    buscarConsulta(cpf, data, horaInicial) { 
        const consultasAgendadas = this.#consultas;
        if (consultasAgendadas.length === 0) {
            return -1;
        }
        for (let i = 0; i < consultasAgendadas.length; i++) {
            
            if (this.#consultas[i].cpf_paciente == cpf && this.#consultas[i].data == data && this.#consultas[i].horaInicial == horaInicial) {
                return i;
            }
        }
        return undefined;
    }

    // Função que retorna as consultas futuras. Utilizada para validação da exclusão de pacientes e também para listá-las quando solicitado.
    consultasFuturasPaciente(cpf) {
        let consultas = this.#consultas;
        let consultas_futuras = [];
        for (let i = 0; i < consultas.length; i++) {
            if (consultas[i].cpf_paciente === cpf) {
                if (ValidacaoDataHora.validacaoData(consultas[i].data)) {
                    consultas_futuras.push(consultas[i]);
                }
            }
        }
        return consultas_futuras;
    }

    // Função que retorna as consultas passadas. 
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

    // Cancela um agendamento com o método splice, que remove o elemento do array.
    cancelarAgendamento(cpf, data, horaInicial) {
        let consulta_id = this.buscarConsulta(cpf, data, horaInicial);
        this.#consultas.splice(consulta_id, 1);
    }

    // Função que cancela todos os agendamentos de um paciente. Utilizada para a exclusão de pacientes.
    deletarConsultasPaciente(cpf) {
        let consultas = this.consultasPassadasPaciente(cpf);
        for (let i = 0; i < consultas.length; i++) {
            this.cancelarAgendamento(cpf, consultas[i].data, consultas[i].horaInicial);
        }
    }

    getAgendaToda() {
        //retorna toda a agenda ordenada por data e hora inicial
        let consultas = this.#consultas;
        consultas.sort(function (a, b) {
            return a.data.localeCompare(b.data) || a.horaInicial - b.horaInicial;
        });
        return consultas;
    }

    getAgendaPeriodo(dataInicial, dataFinal) {
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
const agenda = new Agenda();
module.exports = agenda;