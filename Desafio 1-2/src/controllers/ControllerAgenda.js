const InputMenus = require('../views/InputMenus');
const ViewValidacaoes = require('../views/ViewValidacaoes');
const agenda = require('../models/Agenda');
const ValidacaoAgenda = require('../models/ValidacaoAgenda');
const Consulta = require('../models/Consulta');
const ValidacaoResultados = require('../models/ValidacaoResultados');
const ViewListagem = require('../views/ViewListagem');
class ControllerAgenda {
    static ControllerMenuAgenda(){
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

    static ControllerAgendarConsulta(){
        let dadosConsulta = InputMenus.menuAgendarConsulta();
        let resultadoValidacao = ValidacaoAgenda.validacaoAgenda(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal);
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) {
            let consulta = new Consulta(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal);
            agenda.agendarConsulta(consulta);
            ViewValidacaoes.mensagemSucessoAgendamento();
            this.ControllerMenuAgenda();
        }
        else {
            ViewValidacaoes.mensagemErroAgendamento(resultadoValidacao);
            this.ControllerAgendarConsulta();
        }
    }

    static ControllerCancelarConsulta(){
        let dadosConsulta = InputMenus.menuCancelarConsulta();
        if (ValidacaoAgenda.validacaoAgendamentoExistente(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial)) {
            agenda.cancelarAgendamento(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial);
            ViewValidacaoes.mensagemSucessoCancelamento();
            this.ControllerMenuAgenda();
        }
        else {
            ViewValidacaoes.mensagemErroCancelamento(resultadoValidacao);
            this.ControllerCancelarConsulta();
        }
    }

    static ControllerListarAgenda(){
        let opcao = InputMenus.menuListarAgenda();
        switch (opcao) {
            case 1:
                ViewListagem.listarAgenda();
                this.ControllerMenuAgenda();
                break;
            case 2:
                dadosConsulta = InputMenus.menuListarAgendaPeriodo();
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