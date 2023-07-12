class ValidacaoCadastroPaciente {
    static validacaoNome(nome) {
        if (nome.length >= 5) {
            return true;
        }
        return false;
    }

    static validacaoPaciente(nome, cpf, dataNascimento) {
        if (this.ValidacaoNome(nome) == false) {
            return false;
        }
        if (this.ValidacaoDataNascimento(dataNascimento) == false) {
            return false;
        }
        if (ValidacaoCPF(cpf) == false) {
            return false;
        }


        return true;
    }


}
module.exports = ValidacaoCadastroPaciente;