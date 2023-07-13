const ControllerMenus = require('./controllers/ControllerMenus');

// aqui é o ponto de entrada do programa
try {
    ControllerMenus.ControllerMainMenu();
}
catch (e) {
    console.log(e.message);
}
//





