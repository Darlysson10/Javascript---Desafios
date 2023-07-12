class ValidacaoCPF {


    static validacaoTamanhoCPF(cpf) {
        if (cpf.length == 11) {
            return true;
        }
        return false;
    }

    validacaoDigitosIguaisCPF(cpf) {
        //checar se os 11 dígitos não são iguais
        let digito = cpf[0];
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[i] != digito) {
                return true;
            }
        }
        return false;

    }


    static validacaoDigitosCPF(cpf) {
        let soma = 0;
        let resto;
        if (cpf === "00000000000") {
            return false;
        }
        //obtendo o primeiro digito verificador
        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }
        // obtendo o segundo digito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }
        return true;

    }

    static validacaoCPFExistente(cpf) {
        let paciente_id = CadastroDePacientes.BuscarPaciente(cpf);
        if (paciente_id === undefined) {
            return false;
        }
        return true;
    }

    static validacaoCPF(cpf) {
        if (!this.ValidacaoCPFExistente(cpf) || !this.ValidacaoDigitosCPF(cpf) || !this.ValidacaoTamanhoCPF(cpf) || !this.ValidacaoDigitosIguaisCPF(cpf)) {
            return false;
        } 
        return true;
    }



}
module.exports = ValidacaoCPF;