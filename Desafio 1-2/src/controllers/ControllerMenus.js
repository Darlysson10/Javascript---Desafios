const ControllerCadastro = require('./ControllerCadastro');
const ControllerAgenda = require('./ControllerAgenda');
const InputMenus = require('../views/InputMenus');

class ControllerMenus {
    static ControllerMainMenu() {
        // Lida com os casos de entrada do menu principal, chamando os controllers correspondentes
        let opcao = InputMenus.mainMenu();
        switch (opcao) {
            case 1:
                ControllerCadastro.ControllerCadastroPaciente();
                break;
            case 2:
                ControllerAgenda.ControllerMenuAgenda();
                break;
            case 3:
                break;
            default:
                console.log("Opção inválida");
            }
    }
}
module.exports = ControllerMenus;
