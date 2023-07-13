const CadastroDePacientes = require('../models/CadastroDePacientes');
class ValidacaoCPF {


    static validacaoTamanhoCPF(cpf) {
        if (cpf.length === 11) {
            console.log("CPF válido tamanho");
            return true;
        }
        return false;
    }

    static validacaoDigitosIguaisCPF(cpf) {
        //checar se os 11 dígitos não são iguais
        let digito = cpf[0];
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[i] != digito) {
                return true;
            }
        }
        console.log("CPF inválido digitos iguais");
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
        const pacientes = CadastroDePacientes.pacientesCadastrados();
        if (pacientes === undefined) {
            console.log("Não há pacientes cadastrados");
            return true;
        }
        let paciente_id = CadastroDePacientes.buscarPaciente(cpf);
        if (paciente_id === undefined) {
            return false;
        }
        return true;
    }

    static validacaoCPF(cpf) {
        if (!this.validacaoCPFExistente(cpf) || !this.validacaoTamanhoCPF(cpf) || !this.validacaoDigitosIguaisCPF(cpf)) {
            //!this.validacaoDigitosCPF(cpf)
            console.log("CPF inválido");
            return false;
        } 
        return true;
    }



}
module.exports = ValidacaoCPF;