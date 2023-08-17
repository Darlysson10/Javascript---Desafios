const ValidacaoCPF = require("./ValidacaoCPF");
const ValidacaoDataHora = require("./ValidacaoDataHora");
class ValidacaoCadastroPaciente {
    //Verifica se o nome possui mais de 5 caracteres.
    static validacaoNome(nome) {
        return nome.length >= 5;
    }


    static async validacaoPaciente(nome, cpf, dataNascimento, idade) {
        
        // Um array de resultados para retornar o que ocorreu em cada validação e assim imprimir as mensagens de erro corretamente.
        let resultados = [];
        if (ValidacaoCadastroPaciente.validacaoNome(nome) === false) {
            resultados.push(false);
        }
        else{
            resultados.push(true);
        }

        if (ValidacaoDataHora.validacaoDataNascimento(dataNascimento,idade) === false) {
            resultados.push(false);
        }
        else{
            resultados.push(true);
        }

        if (await ValidacaoCPF.validacaoCPF(cpf) === false) {
            resultados.push(false);
        }
        else{
            resultados.push(true);
        }
        return resultados;
    }


}
module.exports = ValidacaoCadastroPaciente;