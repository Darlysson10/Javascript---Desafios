
const Paciente = require('../models/Paciente');
const cadastroDePacientes = require('../models/CadastroDePacientes');
const ViewListagem = require('../views/ViewListagem');
const InputMenus = require('../views/InputMenus');
const ValidacaoCadastroPaciente = require('../models/ValidacaoCadastro');
const ValidacaoExclusaoPaciente = require('../models/ValidacaoExclusaoPaciente');
const ViewValidacoes = require('../views/ViewValidacaoes');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
const ValidacaoResultados = require('../models/ValidacaoResultados');
const prompt = require('prompt-sync')({ sigint: true });

class ControllerCadastro {
   
    static ControllerCadastroPaciente(){
        const ControllerMenus = require('./ControllerMenus');
        let opcao = InputMenus.menuCadastroPaciente();
        switch (opcao) {
            case 1:
                this.ControllerCadastrarPaciente();
                break;
            case 2:
                this.ControllerExcluirPaciente();
                break;
            case 3:
                this.ControllerListarPacientesCPF();
                break;
            case 4:
                this.ControllerListarPacientesNome();
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
        dadosPaciente.dataNascimento = ValidacaoDataHora.formatarDataInput(dadosPaciente.dataNascimento);
        let idade = Paciente.calcularIdade(dadosPaciente.dataNascimento);
        let resultadoValidacao = ValidacaoCadastroPaciente.validacaoPaciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento, idade);
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) {
            dadosPaciente.dataNascimento = ValidacaoDataHora.formatarDataOutput(dadosPaciente.dataNascimento);
            idade = Math.floor(idade);
            const paciente = new Paciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento, idade);
            cadastroDePacientes.cadastrarPaciente(paciente);
            ViewValidacoes.menssagemSucessoPaciente();
            this.ControllerCadastroPaciente();
        }
        else {
            ViewValidacoes.mensagemErroCadastroPaciente(resultadoValidacao);
            this.ControllerCadastroPaciente();
        }
   }

    static ControllerExcluirPaciente(){
        let cpf = InputMenus.menuExcluirPaciente();
        let resultadoValidacao = ValidacaoExclusaoPaciente.validacaoExclusaoPaciente(cpf);
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) {
            cadastroDePacientes.deletarPaciente(cpf);
            ViewValidacoes.mensagemSucessoExclusao();
            this.ControllerCadastroPaciente();
        }
        else {
            ViewValidacoes.mensagemErroExclusao(resultadoValidacao);
            this.ControllerCadastroPaciente();
        }
    }

    static ControllerListarPacientesCPF(){
        ViewListagem.listarPacientesCPF();
        this.ControllerCadastroPaciente();
    }

    static ControllerListarPacientesNome(){
        ViewListagem.listarPacientesNome();
        this.ControllerCadastroPaciente();
    }



}
module.exports = ControllerCadastro;