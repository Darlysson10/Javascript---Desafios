const ValidacaoDataHora = require('./ValidacaoDataHora');
const ValidacaoCPF = require('./ValidacaoCPF');
const agenda = require('./Agenda');
class ValidacaoAgenda {

    static validacaoAgendamentoExistente(cpf, data, horaInicial) {
        let consulta_id = agenda.buscarConsulta(cpf, data, horaInicial);
        if (consulta_id === undefined) {
            return false;
        }
        return true;
    }


    static validacaoAgenda(cpf, data, horaInicial, horaFinal) {
        if (!ValidacaoDataHora.validacaoDataHora(data, horaInicial, horaFinal) || !this.validacaoAgendamentoExistente(cpf, data, horaInicial, horaFinal) || !ValidacaoCPF.validacaoCPFExistente(cpf)) {
            return false;
        }
        return true;
    }


}
module.exports = ValidacaoAgenda;