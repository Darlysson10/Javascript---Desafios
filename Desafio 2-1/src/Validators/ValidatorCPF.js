// Módulo ValidatorCPF.js:
function ValidatorCPF(){
    
    this.validacaoTamanhoCPF = (cpf) => {
        if (cpf.length === 11) {
          return true;
        }
        return false;
      };
      
      this.validacaoDigitosIguaisCPF = (cpf) => {
        let digito = cpf[0];
        for (let i = 1; i < cpf.length; i++) {
          if (cpf[i] !== digito) {
            return true;
          }
        }
        return false;
      };
      
      this.validacaoDigitosCPF = (cpf) => {
        let soma = 0;
        let resto;
        if (cpf === "00000000000") {
          return false;
        }
        for (let i = 1; i <= 9; i++) {
          soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
          resto = 0;
        }
        if (resto !== parseInt(cpf.substring(9, 10))) {
          return false;
        }
        soma = 0;
        for (let i = 1; i <= 10; i++) {
          soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
          resto = 0;
        }
        if (resto !== parseInt(cpf.substring(10, 11))) {
          return false;
        }
        return true;
      };

      this.validarCPF = (cpf) => {
        if (this.validacaoTamanhoCPF(cpf) && this.validacaoDigitosIguaisCPF(cpf) && this.validacaoDigitosCPF(cpf)) {
          return true;
        }
        return false;
      }
      
}

module.exports = ValidatorCPF;