
const Paciente = require('../models/Paciente');
const ViewListagem = require('../views/ViewListagem');
const InputMenus = require('../views/InputMenus');
const ValidacaoCadastroPaciente = require('../models/ValidacaoCadastro');
const ValidacaoExclusaoPaciente = require('../models/ValidacaoExclusaoPaciente');
const ViewValidacoes = require('../views/ViewValidacaoes');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
const ValidacaoResultados = require('../models/ValidacaoResultados');
const cadastroDePacientes = require('../models/CadastroDePacientes');
const PacienteBD = require('../models bd/PacienteBD');

class ControllerCadastro {
    
    static async ControllerCadastroPaciente(){
        
        const ControllerMenus = require('./ControllerMenus');
        let opcao = InputMenus.menuCadastroPaciente();
        // Lida com as opções escolhidas no menu de cadastro, chamadno os controllers correspondentes.
        switch (opcao) {
            case 1:
                await this.ControllerCadastrarPaciente();
                break;
            case 2:
                this.ControllerExcluirPaciente();
                break;
            case 3:
                await this.ControllerListarPacientesCPF();
                break;
            case 4:
                await this.ControllerListarPacientesNome();
                break;
            case 5:
                ControllerMenus.ControllerMainMenu();
                break;
            default:
                console.log("Opção inválida");

    }
}
    static async ControllerCadastrarPaciente(){
        let dadosPaciente = InputMenus.menuCadastrarPaciente(); // recebe os dados do paciente
        dadosPaciente.dataNascimento = ValidacaoDataHora.formatarDataInput(dadosPaciente.dataNascimento); // formata a data de nascimento
        let idade = Paciente.calcularIdade(dadosPaciente.dataNascimento); // calcula a idade
        // valida os dados do paciente
        let resultadoValidacao = await ValidacaoCadastroPaciente.validacaoPaciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento, idade); 
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se os dados forem válidos, cadastra o paciente
            dadosPaciente.dataNascimento = ValidacaoDataHora.formatarDataInputBanco(dadosPaciente.dataNascimento);
            idade = Math.floor(idade); // arredonda a idade, pois o cálculo retorna um número decimal
            const paciente = new Paciente(dadosPaciente.nome, dadosPaciente.cpf, dadosPaciente.dataNascimento, idade); // cria o objeto paciente
            // cadastra o paciente
            await PacienteBD.create({
                nome: paciente.nome,
                cpf: paciente.cpf,
                dataNascimento: paciente.dataNascimento,
                idade: paciente.idade
            });

            ViewValidacoes.menssagemSucessoPaciente(); // exibe mensagem de sucesso
            this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
        else {
            ViewValidacoes.mensagemErroCadastroPaciente(resultadoValidacao); // exibe mensagem de erro
            this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
   }

    static async ControllerExcluirPaciente(){ // exclui o paciente
        let cpf = InputMenus.menuExcluirPaciente(); // recebe o cpf do paciente
        let resultadoValidacao = await ValidacaoExclusaoPaciente.validacaoExclusaoPaciente(cpf); // valida o cpf
        if (ValidacaoResultados.validacaoResultados(resultadoValidacao)) { // se o cpf for válido, exclui o paciente
        
           await PacienteBD.destroy({ where: { cpf: cpf } });
           ViewValidacoes.mensagemSucessoExclusao(); // exibe mensagem de sucesso
           this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
        else {
            ViewValidacoes.mensagemErroExclusao(resultadoValidacao); // exibe mensagem de erro
            this.ControllerCadastroPaciente(); // retorna ao menu de cadastro
        }
    }

    static async ControllerListarPacientesCPF(){ // lista os pacientes por cpf
        await ViewListagem.listarPacientesCPF();
        this.ControllerCadastroPaciente();
    }

    static async ControllerListarPacientesNome(){ // lista os pacientes por nome
        await ViewListagem.listarPacientesNome();
        this.ControllerCadastroPaciente();
    }



}
module.exports = ControllerCadastro;