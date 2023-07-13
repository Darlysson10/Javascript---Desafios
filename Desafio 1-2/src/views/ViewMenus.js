class ViewMenus {
    static menuPrincipal() {
        console.log("Menu Principal");
        console.log("1 - Cadastro de Paciente");
        console.log("2 - Agenda");
        console.log("3 - Fim");
    }

    static menuCadastroPaciente() {
        console.log("Menu Cadastro de Paciente");
        console.log("1 - Cadastrar novo Paciente");
        console.log("2 - Excluir Paciente");
        console.log("3 - Listar Pacientes (ordenado por CPF)")
        console.log("4 - Listar Pacientes (ordenado por nome)");
        console.log("5 - Voltar p/ menu principal");
    }

    static menuCadastrarPaciente(){
        console.log("Cadastrar Paciente");
        console.log("Digite os dados do paciente:");
    }
    
    static menuExcluirPaciente(){
        console.log("Excluir Paciente");
        console.log("Digite o CPF do paciente:");
    }
    
    static menuAgenda() {
        console.log("Agenda");
        console.log("1 - Agendar Consulta");
        console.log("2 - Cancelar Consulta");
        console.log("3 - Listar Agenda");
        console.log("4 - Voltar p/ menu principal");
    }



}
module.exports = ViewMenus;