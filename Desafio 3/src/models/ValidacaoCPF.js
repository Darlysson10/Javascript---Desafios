const cadastroDePacientes = require('../models/CadastroDePacientes');
const PacienteBD = require('../models bd/PacienteBD');
class ValidacaoCPF {


   //Verifica se o tamanho do cpf é 11.
    static validacaoTamanhoCPF(cpf) {
        return cpf.length === 11;
    }

    static validacaoDigitosIguaisCPF(cpf) {
        //checar se os 11 dígitos não são iguais
        let digito = cpf[0];
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[i] != digito) {
                return true;
            }
        }
        return false;

    }

    // Validação do CPF módulo 11 conforme o anexo no desafio
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
        return resto === parseInt(cpf.substring(10, 11));

    }
    // Verifica se o cpf já está cadastrado no sistema. 
    static async validacaoCPFExistente(cpf) {
       // verifica se o cpf já está cadastrado no sistema no banco de dados
       const paciente = await PacienteBD.findOne({ where: { cpf: cpf } });
       return !!(paciente);
    }

    static async validacaoCPF(cpf) {
        // Verificação geral do CPF. Utilizada para validar o CPF no cadastro de pacientes e no agendamento de consultas.
        return !(await this.validacaoCPFExistente(cpf) || !this.validacaoTamanhoCPF(cpf) || !this.validacaoDigitosIguaisCPF(cpf) || !this.validacaoDigitosCPF(cpf));
    }



}
module.exports = ValidacaoCPF;