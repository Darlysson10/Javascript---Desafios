const ValidacaoDataHora = require('./ValidacaoDataHora');
const ValidacaoCPF = require('./ValidacaoCPF');
const agenda = require('./Agenda');
const AgendaBD = require('../models bd/AgendaBD');
class ValidacaoAgenda {

    static async validacaoAgendamentoExistente(cpf, data, horaInicial) {
        // Verifica se o paciente já tem uma consulta agendada para o mesmo dia e horário.
        data = ValidacaoDataHora.formatarDataInputBanco(data);
        let consulta_id = await AgendaBD.findOne({ where: { cpf: cpf, data: data, horaInicial: horaInicial } });
        return !(consulta_id === undefined || consulta_id === -1 || consulta_id === null);
    }


    static async validacaoAgenda(cpf, data, horaInicial, horaFinal) {
        let resultados = [];
        //Condição para a validação da data e hora geral, mais explicações no arquivo ValidacaoDataHora.js
        if (ValidacaoDataHora.validacaoDataHora(data, horaInicial, horaFinal) === false) {resultados.push(false);}
        else {resultados.push(true);}
        //Verifica se o cpf existe no cadastro de pacientes.
        if (await ValidacaoCPF.validacaoCPFExistente(cpf) === false)  {resultados.push(false);}
        else resultados.push(true);
        // Verifica se o paciente já tem uma consulta agendada para o mesmo dia e horário.
        if (await this.validacaoAgendamentoExistente(cpf, data, horaInicial)) {resultados.push(false);}
        else {resultados.push(true);}
        return resultados;
    }

    static async validacaoCancelamento(cpf, data, horaInicial) {
        let resultados = [];
        if (await ValidacaoCPF.validacaoCPFExistente(cpf) === false)  {resultados.push(false);}
        else resultados.push(true);
        if (await this.validacaoAgendamentoExistente(cpf, data, horaInicial)) {resultados.push(true);}
        else {resultados.push(false);}
        return resultados;
    }



}
module.exports = ValidacaoAgenda;