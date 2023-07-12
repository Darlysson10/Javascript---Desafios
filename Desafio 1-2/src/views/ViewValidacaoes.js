class ViewValidacoes {

    static menssagemSucessoPaciente(){
        console.log("Paciente cadastrado com sucesso!");
    }

    static mensagemErroCadastroPaciente(resultadoValidacao){
        console.log("O paciente não foi cadastrado. Verifique os erros abaixo:");
        if (!resultadoValidacao[0]) {
            console.log("Erro: Nome inválido. O nome deve ter pelo menos 5 caracteres.");
        }
        if (!resultadoValidacao[1]) {
            console.log("Erro: Data de nascimento inválida. O paciente deve ter pelo menos 13 anos.");
        }
        if (!resultadoValidacao[2]) {
            console.log("CPF inválido. O CPF deve ter 11 dígitos.");
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
}
module.exports = ViewValidacoes;