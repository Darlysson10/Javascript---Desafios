const ViewMenus = require('../views/ViewMenus');
const ControllerMenus = require('./ControllerMenus');
const Paciente = require('../models/Paciente');
const CadastroDePacientes = require('../models/CadastroDePacientes');
const ViewListagem = require('../views/ViewListagem');
const InputMenus = require('../views/InputMenus');
const ValidacaoCadastroPaciente = require('../models/ValidacaoCadastro');
const ValidacaoExclusaoPaciente = require('../models/ValidacaoExclusao');
const prompt = require('prompt-sync')({ sigint: true });

class ControllerCadastro {
   
    static ControllerCadastroPaciente(){
    let opcao = InputMenus.menuCadastroPaciente();
    switch (opcao) {
        case 1:
            this.ControllerCadastrarPaciente();
            break;
        case 2:
            this.ControllerExcluirPaciente();
            break;
        case 3:
            ViewListagem.listarPacientesCPF();
            break;
        case 4:
            ViewListagem.listarPacientesNome();
            break;
        case 5:
            ControllerMenus.ControllerMainMenu();
            break;
        default:
            console.log("Opção inválida");

    }
}
    static ControllerCadastrarPaciente(){
        let dadosPaciente = InputMenus.menuCadastrarPaciente();
        let resultadoValidacao = ValidacaoCadastroPaciente.validacaoPaciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento);
        if (resultadoValidacao.length == 0) {
            let paciente = new Paciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento);
            CadastroDePacientes.cadastrarPaciente(paciente);
            ViewMenus.mensagemSucessoPaciente();
            this.ControllerCadastroPaciente();
        }
        else {
            ViewMenus.mensagemErroCadastroPaciente(resultadoValidacao);
            this.ControllerCadastrarPaciente();
        }
   }

    static ControllerExcluirPaciente(){
        let cpf = InputMenus.menuExcluirPaciente();
        let resultadoValidacao = ValidacaoExclusaoPaciente.validacaoExclusao(cpf);
        if (resultadoValidacao.length == 0) {
            CadastroDePacientes.excluirPaciente(cpf);
            ViewMenus.mensagemSucessoExclusao();
            this.ControllerCadastroPaciente();
        }
        else {
            ViewMenus.mensagemErroExclusao(resultadoValidacao);
            this.ControllerExcluirPaciente();
        }
        

    }
}
module.exports = ControllerCadastro;