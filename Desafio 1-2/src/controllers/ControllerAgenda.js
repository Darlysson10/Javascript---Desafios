const InputMenus = require('../views/InputMenus');
const ViewValidacaoes = require('../views/ViewValidacaoes');
const agenda = require('../models/Agenda');
const cadastroDePacientes = require('../models/CadastroDePacientes');
const ValidacaoAgenda = require('../models/ValidacaoAgenda');
const Consulta = require('../models/Consulta');
const ValidacaoResultados = require('../models/ValidacaoResultados');
const ViewListagem = require('../views/ViewListagem');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
class ControllerAgenda {
    static ControllerMenuAgenda(){ // menu da agenda
        const ControllerMenus = require('./ControllerMenus');
        let opcao = InputMenus.menuAgenda();
        switch (opcao) {
            case 1:
                this.ControllerAgendarConsulta();
                break;
            case 2:
                this.ControllerCancelarConsulta();
                break;
            case 3:
                this.ControllerListarAgenda();
                break;
            case 4:
                ControllerMenus.ControllerMainMenu();
                break;
            default:
                console.log("Opção inválida");
        }

    }

    static ControllerAgendarConsulta(){ // Controller para agendar consulta
        let dadosConsulta = InputMenus.menuAgendarConsulta(); // recebe os dados da consulta
        dadosConsulta.data = ValidacaoDataHora.formatarDataInput(dadosConsulta.data); // formata a data
        let resultadoValidacao = ValidacaoAgenda.validacaoAgenda(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal); // valida os dados da consulta
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se os dados forem válidos, agenda a consulta
            dadosConsulta.data = ValidacaoDataHora.formatarDataOutput(dadosConsulta.data); // formata a data para o padrão dd/mm/aaaa
            let dadosPaciente = cadastroDePacientes.pacienteNomeDataNasc(dadosConsulta.cpf); // busca os dados do paciente
            let tempo = ValidacaoDataHora.subtrairHoras(dadosConsulta.horaInicial, dadosConsulta.horaFinal); // calcula o tempo da consulta
            let consulta = new Consulta(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal, tempo, dadosPaciente.nome, dadosPaciente.dataNascimento); // cria o objeto consulta
            agenda.agendarConsulta(consulta); // agenda a consulta
            ViewValidacaoes.mensagemSucessoAgendamento();
            this.ControllerMenuAgenda();
        }
        else {
            ViewValidacaoes.mensagemErroAgendamento(resultadoValidacao);
            this.ControllerAgendarConsulta();
        }
    }

    static ControllerCancelarConsulta(){ // Controller para cancelar consulta
        let dadosConsulta = InputMenus.menuCancelarConsulta(); // recebe os dados da consulta
        dadosConsulta.data = ValidacaoDataHora.formatarDataInput(dadosConsulta.data);// formata a data
        let resultadoValidacao = ValidacaoAgenda.validacaoCancelamento(dadosConsulta.cpf,  ValidacaoDataHora.formatarDataOutput(dadosConsulta.data), dadosConsulta.horaInicial); // valida os dados da consulta
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se os dados forem válidos, cancela a consulta
            agenda.cancelarAgendamento(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial);
            ViewValidacaoes.mensagemSucessoCancelamento();
            this.ControllerMenuAgenda();
        }
        else {
            ViewValidacaoes.mensagemErroCancelamento(resultadoValidacao);
            this.ControllerCancelarConsulta();
        }
    }

    static ControllerListarAgenda(){ // Controller para listar a agenda
        let opcao = InputMenus.menuListarAgenda(); // lida com as opções de listar a agenda toda ou por período
        switch (opcao) {
            case 1:
                ViewListagem.listarAgenda();
                this.ControllerMenuAgenda();
                break;
            case 2:
                let dadosConsulta = InputMenus.menuListarAgendaPeriodo();
                ViewListagem.listarAgendaPeriodo(dadosConsulta.dataInicial, dadosConsulta.dataFinal);
                this.ControllerMenuAgenda();
                break;
            default:
                console.log("Opção inválida");
                this.ControllerMenuAgenda();
        }
       
    }
}
module.exports = ControllerAgenda;