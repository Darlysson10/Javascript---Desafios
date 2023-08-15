const ValidacaoDataHora = require('./ValidacaoDataHora');
const ValidacaoCPF = require('./ValidacaoCPF');
const agenda = require('./Agenda');
class ValidacaoAgenda {

    static validacaoAgendamentoExistente(cpf, data, horaInicial) {
        // Verifica se o paciente já tem uma consulta agendada para o mesmo dia e horário.
        let consulta_id = agenda.buscarConsulta(cpf, data, horaInicial);
        // A função buscarConsulta pode retornar undefined, caso não encontre a consulta. ou -1 caso não haja consultas agendadas.
        if (consulta_id === undefined || consulta_id === -1) {
            //Não existe agendamento para o paciente na data e hora informadas.
            return false;
        }
        return true;
    }


    static validacaoAgenda(cpf, data, horaInicial, horaFinal) {
        let resultados = [];
        //Condição para a validação da data e hora geral, mais explicações no arquivo ValidacaoDataHora.js
        if (ValidacaoDataHora.validacaoDataHora(data, horaInicial, horaFinal) === false) {resultados.push(false);}
        else {resultados.push(true);}
        //Verifica se o cpf existe no cadastro de pacientes.
        if (ValidacaoCPF.validacaoCPFExistente(cpf) === false)  {resultados.push(false);}
        else resultados.push(true);
        // Verifica se o paciente já tem uma consulta agendada para o mesmo dia e horário.
        if (this.validacaoAgendamentoExistente(cpf, data, horaInicial)) {resultados.push(false);}
        else {resultados.push(true);}
        return resultados;
    }

    static validacaoCancelamento(cpf, data, horaInicial) {
        let resultados = [];
        if (ValidacaoCPF.validacaoCPFExistente(cpf) === false)  {resultados.push(false);}
        else resultados.push(true);
        if (this.validacaoAgendamentoExistente(cpf, data, horaInicial)) {resultados.push(true);}
        else {resultados.push(false);}
        return resultados;
    }



}
module.exports = ValidacaoAgenda;