const InputMenus = require('../views/InputMenus');
const ControllerMenus = require('./ControllerMenus');
const ViewValidacaoes = require('../views/ViewValidacaoes');
const Agenda = require('../models/Agenda');
const ValidacaoAgenda = require('../models/ValidacaoAgenda');
const Consulta = require('../models/Consulta');
class ControllerAgenda {
    static ControllerMenuAgenda(){
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
        if (resultadoValidacao.length === 0) {
            let consulta = new Consulta(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal);
            Agenda.agendarConsulta(consulta);
            ViewValidacaoes.mensagemSucessoAgendamento();
            this.ControllerMenuAgenda();
        }
        else {
            ViewValidacaoes.mensagemErroAgendamento(resultadoValidacao);
            this.ControllerAgendarConsulta();
        }
    }
}
module.exports = ControllerAgenda;