
const Paciente = require('../models/Paciente');
const ViewListagem = require('../views/ViewListagem');
const InputMenus = require('../views/InputMenus');
const ValidacaoCadastroPaciente = require('../models/ValidacaoCadastro');
const ValidacaoExclusaoPaciente = require('../models/ValidacaoExclusaoPaciente');
const ViewValidacoes = require('../views/ViewValidacaoes');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
const ValidacaoResultados = require('../models/ValidacaoResultados');
const cadastroDePacientes = require('../models/CadastroDePacientes');

class ControllerCadastro {
    
    static ControllerCadastroPaciente(){
        
        const ControllerMenus = require('./ControllerMenus');
        let opcao = InputMenus.menuCadastroPaciente();
        // Lida com as opções escolhidas no menu de cadastro, chamadno os controllers correspondentes.
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
        let dadosPaciente = InputMenus.menuCadastrarPaciente(); // recebe os dados do paciente
        dadosPaciente.dataNascimento = ValidacaoDataHora.formatarDataInput(dadosPaciente.dataNascimento); // formata a data de nascimento
        let idade = Paciente.calcularIdade(dadosPaciente.dataNascimento); // calcula a idade
        let resultadoValidacao = ValidacaoCadastroPaciente.validacaoPaciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento, idade); // valida os dados do paciente
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se os dados forem válidos, cadastra o paciente
            dadosPaciente.dataNascimento = ValidacaoDataHora.formatarDataOutput(dadosPaciente.dataNascimento); // formata a data de nascimento para o padrão dd/mm/aaaa
            idade = Math.floor(idade); // arredonda a idade, pois o cálculo retorna um número decimal
            const paciente = new Paciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento, idade); // cria o objeto paciente
            cadastroDePacientes.cadastrarPaciente(paciente); // cadastra o paciente
            ViewValidacoes.menssagemSucessoPaciente(); // exibe mensagem de sucesso
            this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
        else {
            ViewValidacoes.mensagemErroCadastroPaciente(resultadoValidacao); // exibe mensagem de erro
            this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
   }

    static ControllerExcluirPaciente(){ // exclui o paciente
        let cpf = InputMenus.menuExcluirPaciente(); // recebe o cpf do paciente
        let resultadoValidacao = ValidacaoExclusaoPaciente.validacaoExclusaoPaciente(cpf); // valida o cpf
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se o cpf for válido, exclui o paciente
            cadastroDePacientes.deletarPaciente(cpf); // Função para excluir o paciente
            ViewValidacoes.mensagemSucessoExclusao(); // exibe mensagem de sucesso
            this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
        else {
            ViewValidacoes.mensagemErroExclusao(resultadoValidacao); // exibe mensagem de erro
            this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
    }

    static ControllerListarPacientesCPF(){ // lista os pacientes por cpf
        ViewListagem.listarPacientesCPF();
        this.ControllerCadastroPaciente();
    }

    static ControllerListarPacientesNome(){ // lista os pacientes por nome
        ViewListagem.listarPacientesNome();
        this.ControllerCadastroPaciente();
    }



}
module.exports = ControllerCadastro;