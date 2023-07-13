const ValidacaoCPF = require("./ValidacaoCPF");
const ValidacaoDataHora = require("./ValidacaoDataHora");
const CadastroDePacientes = require("../models/CadastroDePacientes");
class ValidacaoCadastroPaciente {
    static validacaoNome(nome) {
        if (nome.length >= 5) {
            return true;
        }
        return false;
    }

    static ValidacaoResultados(resultados) {
        for (let i = 0; i < resultados.length; i++) {
            if (resultados[i] === false) {
                return false;
            }
        }
        return true;
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
        console.log("Resultados das validacoes:", resultados);
        return resultados;
    }


}
module.exports = ValidacaoCadastroPaciente;