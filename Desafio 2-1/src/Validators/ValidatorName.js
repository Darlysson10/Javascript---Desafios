function ValidatorName() {

    this.validacaoTamanho = (nome) => {
        if (nome.length < 5 || nome.length > 60) {
            return false;
        }
        return true;
    }

    this.validacaoCaracteres = (nome) => {
        let regex = /^[a-zA-Z\u00C0-\u00FF ]+$/;
        if (regex.test(nome)) {
            return true;
        }
        return false;
    }

    this.validarNome = (nome) => {
        if (this.validacaoTamanho(nome) && this.validacaoCaracteres(nome)) {
            return true;
        }
        return false;
    }
}