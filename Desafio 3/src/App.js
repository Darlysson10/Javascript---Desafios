(async () => {
    const ControllerMenus = require('./controllers/ControllerMenus');

    // aqui é o ponto de entrada do programa
    try {
        // Chama o controller do menu principal
        await ControllerMenus.ControllerMainMenu();
    }
    catch (e) {
        console.log(e.message);
    }
    //
})();





