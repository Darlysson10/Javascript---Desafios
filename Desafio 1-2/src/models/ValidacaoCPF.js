class ValidacaoCPF {


    static validacaoTamanhoCPF(cpf) {
        if (cpf.length == 11) {
            return true;
        }
        return false;
    }


    static validacaoDigitosCPF(cpf) { // refazer conforme o anexo
        let digitos = cpf.split("");
        let digitos_iguais = true;
        for (let i = 0; i < digitos.length; i++) {
            if (digitos[i] !== digitos[0]) {
                digitos_iguais = false;
            }
        }
        if (digitos_iguais == true) {
            return false;
        }
        return true;
    }

    static validacaoCPFExistente(cpf) {
        let paciente_id = CadastroDePacientes.BuscarPaciente(cpf);
        if (paciente_id == undefined) {
            return false;
        }
        return true;
    }

    static validacaoCPF(cpf) {
        if (!this.ValidacaoCPFExistente(cpf) || !this.ValidacaoDigitosCPF(cpf) || !this.ValidacaoTamanhoCPF(cpf)) {
            return false;
        } 
        return true;
    }



}
module.exports = ValidacaoCPF;