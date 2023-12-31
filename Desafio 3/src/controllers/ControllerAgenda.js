const InputMenus = require('../views/InputMenus');
const ViewValidacaoes = require('../views/ViewValidacaoes');
const ValidacaoAgenda = require('../models/ValidacaoAgenda');
const Consulta = require('../models/Consulta');
const ValidacaoResultados = require('../models/ValidacaoResultados');
const ViewListagem = require('../views/ViewListagem');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
const AgendaBD = require('../models bd/AgendaBD');
const Paciente = require('../models/Paciente');
class ControllerAgenda {
    static async ControllerMenuAgenda(){ // menu da agenda
        const ControllerMenus = require('./ControllerMenus');
        let opcao = InputMenus.menuAgenda();
        switch (opcao) {
            case 1:
                await this.ControllerAgendarConsulta();
                break;
            case 2:
                this.ControllerCancelarConsulta();
                break;
            case 3:
                await this.ControllerListarAgenda();
                break;
            case 4:
                ControllerMenus.ControllerMainMenu();
                break;
            default:
                console.log("Opção inválida");
        }

    }

    static async ControllerAgendarConsulta(){ // Controller para agendar consulta
        let dadosConsulta = InputMenus.menuAgendarConsulta(); // recebe os dados da consulta
        dadosConsulta.data = ValidacaoDataHora.formatarDataInput(dadosConsulta.data); // formata a data
        let resultadoValidacao = await ValidacaoAgenda.validacaoAgenda(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal); // valida os dados da consulta
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se os dados forem válidos, agenda a consulta
            dadosConsulta.data = ValidacaoDataHora.formatarDataInputBanco(dadosConsulta.data); // formata a data para o padrão ddmmmaaaa
            let dadosPaciente = await Paciente.BuscarPacienteCPF(dadosConsulta.cpf); // busca os dados do paciente
            let tempo = ValidacaoDataHora.subtrairHoras(dadosConsulta.horaInicial, dadosConsulta.horaFinal); // calcula o tempo da consulta
            let consulta = new Consulta(dadosPaciente.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal, tempo);
            await consulta.AddConsultaDB(); // cadastra a consulta no banco de dados
            ViewValidacaoes.mensagemSucessoAgendamento();
            this.ControllerMenuAgenda();
        }
        else {
            ViewValidacaoes.mensagemErroAgendamento(resultadoValidacao);
            this.ControllerMenuAgenda();
        }
    }

    static async ControllerCancelarConsulta(){ // Controller para cancelar consulta
        let dadosConsulta = InputMenus.menuCancelarConsulta(); // recebe os dados da consulta
        dadosConsulta.data = ValidacaoDataHora.formatarDataInput(dadosConsulta.data);// formata a data
        let resultadoValidacao = await ValidacaoAgenda.validacaoCancelamento(dadosConsulta.cpf,  dadosConsulta.data, dadosConsulta.horaInicial); // valida os dados da consulta
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se os dados forem válidos, cancela a consulta
           
            dadosConsulta.data = ValidacaoDataHora.formatarDataInputBanco(dadosConsulta.data);
            //abstrair para uma função da classe agenda
            await Consulta.ExcluirConsultaDB(dadosConsulta.cpf, dadosConsulta.data, dadosConsulta.horaInicial); // exclui a consulta do banco de dados
            ViewValidacaoes.mensagemSucessoCancelamento();
            this.ControllerMenuAgenda();
        }
        else {
            ViewValidacaoes.mensagemErroCancelamento(resultadoValidacao);
            this.ControllerCancelarConsulta();
        }
    }

    static async ControllerListarAgenda(){ // Controller para listar a agenda
        let opcao = InputMenus.menuListarAgenda(); // lida com as opções de listar a agenda toda ou por período
        switch (opcao) {
            case 1:
                await ViewListagem.listarAgenda();
                this.ControllerMenuAgenda();
                break;
            case 2:
                let dadosConsulta = InputMenus.menuListarAgendaPeriodo();
                dadosConsulta.dataInicial = ValidacaoDataHora.formatarDataInput(dadosConsulta.dataInicial);
                dadosConsulta.dataFinal = ValidacaoDataHora.formatarDataInput(dadosConsulta.dataFinal);
                await ViewListagem.listarAgendaPeriodo(dadosConsulta.dataInicial, dadosConsulta.dataFinal);
                this.ControllerMenuAgenda();
                break;
            default:
                console.log("Opção inválida");
                this.ControllerMenuAgenda();
        }
       
    }
}
module.exports = ControllerAgenda;