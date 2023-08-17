const ControllerCadastro = require('./ControllerCadastro');
const ControllerAgenda = require('./ControllerAgenda');
const InputMenus = require('../views/InputMenus');

class ControllerMenus {
    static async ControllerMainMenu() {
        // Lida com os casos de entrada do menu principal, chamando os controllers correspondentes
        let opcao = InputMenus.mainMenu();
        switch (opcao) {
            case 1:
                await ControllerCadastro.ControllerCadastroPaciente();
                break;
            case 2:
                await ControllerAgenda.ControllerMenuAgenda();
                break;
            case 3:
                break;
            default:
                console.log("Opção inválida");
            }
    }
}
module.exports = ControllerMenus;
