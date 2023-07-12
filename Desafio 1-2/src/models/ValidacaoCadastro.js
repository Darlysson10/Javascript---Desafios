const ValidacaoCPF = require("./ValidacaoCPF");
const ValidacaoDataHora = require("./ValidacaoDataHora");
class ValidacaoCadastroPaciente {
    static validacaoNome(nome) {
        if (nome.length >= 5) {
            return true;
        }
        return false;
    }

    static validacaoPaciente(nome, cpf, dataNascimento) {
        let resultados = [];
        if (!this.ValidacaoNome(nome)) {
            resultados.push(false);
        }
        if (!ValidacaoDataHora.ValidacaoDataNascimento(dataNascimento)) {
            resultados.push(false);
        }
        if (!ValidacaoCPF.validacaoCPF(cpf)) {
            resultados.push(false);
        }
        return resultados;
    }


}
module.exports = ValidacaoCadastroPaciente;