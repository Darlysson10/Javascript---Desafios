class ViewValidacoes {

    static menssagemSucessoPaciente(){
        console.log("Paciente cadastrado com sucesso!");
    }

    static mensagemErroCadastroPaciente(resultadoValidacao){
        console.log("O paciente não foi cadastrado. Verifique os erros abaixo:");
        if (resultadoValidacao[0] === false) {
            console.log("Erro: Nome inválido. O nome deve ter pelo menos 5 caracteres.");
        }
        if (resultadoValidacao[1] === false) {
            console.log("Erro: Data de nascimento inválida. O paciente deve ter pelo menos 13 anos.");
        }
        if (resultadoValidacao[2] === false) {
            console.log("Erro: CPF inválido.");
        }
        console.log("Tente novamente.");

    }

    static mensagemSucessoExclusao(){
        console.log("Paciente excluído com sucesso!");
    }

    static mensagemErroExclusao(resultadoValidacao){
        console.log("O paciente não foi excluído. Verifique os erros abaixo:");
        if (!resultadoValidacao[0]) {
            console.log("Erro: O paciente possui consulta(s) agendada(s). Não é possível excluí-lo.");
        }
        if (!resultadoValidacao[1]) {
            console.log("Erro: CPF inválido ou não foi encontrado.");
        }
        console.log("Tente novamente.");
    }

    static mensagemSucessoAgendamento(){
        console.log("Consulta agendada com sucesso!");
    }

    static mensagemErroAgendamento(resultadoValidacao){
        console.log("A consulta não foi agendada. Verifique os erros abaixo:");
        if (!resultadoValidacao[0]) {
            console.log("Erro: O paciente não está cadastrado.");
        }
        if (!resultadoValidacao[1]) {
            console.log("Erro: O paciente possui consulta(s) agendada(s) neste horário."); 
        }
        if (!resultadoValidacao[2]) {
            console.log("Erro: O paciente possui consulta(s) agendada(s) neste dia.");
        }
        if (!resultadoValidacao[3]) {
            console.log("Erro: A hora inicial deve ser menor que a hora final.");
        }
        if (!resultadoValidacao[4]) {
            console.log("Erro: A data deve ser posterior a data atual.");
        }
        console.log("Tente novamente.");
    }

    static mensagemSucessoCancelamento(){
        console.log("Consulta cancelada com sucesso!");
    }
    

}
module.exports = ViewValidacoes;