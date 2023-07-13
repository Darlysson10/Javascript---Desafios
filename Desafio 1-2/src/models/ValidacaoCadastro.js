const ValidacaoCPF = require("./ValidacaoCPF");
const ValidacaoDataHora = require("./ValidacaoDataHora");
class ValidacaoCadastroPaciente {
    static validacaoNome(nome) {
        if (nome.length >= 5) {
            return true;
        }
        return false;
    }


    static validacaoPaciente(nome, cpf, dataNascimento, idade) {
        
        
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

        if (ValidacaoCPF.validacaoCPF(cpf) === false) {
            resultados.push(false);
        }
        else{
            resultados.push(true);
        }
        return resultados;
    }


}
module.exports = ValidacaoCadastroPaciente;