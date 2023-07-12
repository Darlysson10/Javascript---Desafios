const ViewMenus = require('../views/ViewMenus');
const Paciente = require('../models/Paciente');
const CadastroDePacientes = require('../models/CadastroDePacientes');
const ViewListagem = require('../views/ViewListagem');
const prompt = require('prompt-sync')({ sigint: true });

class InputMenus {
        static mainMenu() {
            ViewMenus.menuPrincipal();
            let opcao = parseInt(prompt());
            return opcao;
        }

        static menuCadastroPaciente() {
            ViewMenus.menuCadastroPaciente();
            let opcao = parseInt(prompt());
            return opcao;
        }
    
        static menuCadastrarPaciente() {
            ViewMenus.menuCadastrarPaciente();
            let nome = prompt("Nome: ");
            let cpf = prompt("CPF: ");
            let dataNascimento = prompt("Data de Nascimento: ");
            return {nome, cpf, dataNascimento};
        }
    
        static menuExcluirPaciente() {
            ViewMenus.menuExcluirPaciente();
            let cpf = prompt();
            return cpf;
        }
    
        static menuListarPacientesCPF() {
            let cpf = prompt("Digite o CPF do paciente: ");
            return cpf;
        }
    
        static menuListarPacientesNome() {
            ViewListagem.listarPacientesNome();
        }
    
}
module.exports = InputMenus;