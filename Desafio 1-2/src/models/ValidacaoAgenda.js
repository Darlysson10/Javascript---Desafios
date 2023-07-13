class ValidacaoAgenda {

    static validacaoAgendamentoExistente(cpf, data, horaInicial) {
        let consulta_id = Agenda.buscarConsulta(cpf, data, horaInicial);
        if (consulta_id === undefined) {
            return false;
        }
        return true;
    }


// O método abaixo é utilizado tanto para o agendamento quanto para o cancelamento de um agendamento.
    static validacaoAgenda(cpf, data, horaInicial, horaFinal) {
        if (!this.validacaoDataHora(data, horaInicial, horaFinal) || !this.validacaoAgendamentoExistente(cpf, data, horaInicial, horaFinal) || !ValidacaoCPF.validacaoCPFExistente(cpf)) {
            return false;
        }
        return true;
    }

}
module.exports = ValidacaoAgenda;