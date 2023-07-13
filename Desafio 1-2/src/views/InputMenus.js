const ViewMenus = require('../views/ViewMenus');
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

        static menuAgenda(){
            ViewMenus.menuAgenda();
            let opcao = parseInt(prompt());
            return opcao;
        }

        static menuAgendarConsulta(){
            ViewMenus.menuAgendarConsulta();
            let cpf = prompt("CPF: ");
            let data = prompt("Data: ");
            let horaInicial = prompt("Hora Inicial: ");
            let horaFinal = prompt("Hora Final: ");
            return {cpf, data, horaInicial, horaFinal};
        }
    
}
module.exports = InputMenus;