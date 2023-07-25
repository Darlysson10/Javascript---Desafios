import { DateTime } from 'luxon';

class ValidaCliente {
    #cliente;
    #erros = [];
    constructor(cliente) {
        this.#cliente = cliente;
        this.#erros = [];
    }

    validacaoTamanho = () => {
        if (this.#cliente.nome.length < 5 || this.#cliente.nome.length > 60) {
            return false;
        }
        return true;
    }

    validacaoCaracteres = () => {
        let regex = /^[a-zA-Z\u00C0-\u00FF ]+$/;
        if (regex.test(this.#cliente.nome)) {
            return true;
        }
        return false;
    }

    validacaoCampoVazio = (campo) => {
        if (campo === '' || campo === null || campo === undefined){
            return true;
        }
        return false;
    }

    validarNome = () => {
        if (this.validacaoTamanho() && this.validacaoCaracteres()) {
            return true;
        }
        return false;
    }

    

    validaDataNascimento() {
        const dataNascimento = DateTime.fromFormat(this.#cliente.dt_nascimento, 'ddMMyyyy');
        const dataAtual = DateTime.now();
        const idade = dataAtual.diff(dataNascimento, 'years');
        if (idade.years < 18) {
            return false;
        }
        return true;
    }

    validacaoTamanhoCPF = () => {
        if (this.#cliente.length === 11) {
          return true;
        }
        return false;
      };
      
      validacaoDigitosIguaisCPF = () => {
        let digito = this.#cliente.cpf[0];
        for (let i = 1; i < this.#cliente.cpf.length; i++) {
          if (this.#cliente.cpf[i] !== digito) {
            return true;
          }
        }
        return false;
      };
      
      validacaoDigitosCPF = () => {
        let soma = 0;
        let resto;
        if (this.#cliente.cpf === "00000000000") {
          return false;
        }
        for (let i = 1; i <= 9; i++) {
          soma += parseInt(this.#cliente.cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
          resto = 0;
        }
        if (resto !== parseInt(this.#cliente.cpf.substring(9, 10))) {
          return false;
        }
        soma = 0;
        for (let i = 1; i <= 10; i++) {
          soma += parseInt(this.#cliente.cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
          resto = 0;
        }
        if (resto !== parseInt(this.#cliente.cpf.substring(10, 11))) {
          return false;
        }
        return true;
      };

      validarCPF = () => {
        if (this.validacaoTamanhoCPF() && this.validacaoDigitosIguaisCPF() && this.validacaoDigitosCPF()) {
          return true;
        }
        return false;
      }

      validarRendaMensal() {
        if (this.#cliente.renda_mensal < 0) {
            return false;
        }
        return true;
    }

    validarEstadoCivil() {
        if (this.#cliente.estado_civil != 'C' && this.#cliente.estado_civil != 'S' && this.#cliente.estado_civil != 'V' && this.#cliente.estado_civil != 'D' && this.#cliente.estado_civil != '' ) {
            return false;
        }
        return true;
    }

    validaCliente() {
      if (!this.validarNome() && !this.validacaoCampoVazio(this.#cliente.nome)) {  
        this.#erros.push({
            "campo" : "nome",
            "mensagem" : "Nome inválido."
        });
      }
      else if (this.validacaoCampoVazio(this.#cliente.nome)) {
        this.#erros.push({
            "campo" : "nome",
            "mensagem" : "Campo obrigatório ausente."
        });
      }
      if (!this.validarCPF() && !this.validacaoCampoVazio(this.#cliente.cpf)) {
          this.#erros.push({
            "campo" : "cpf",
            "mensagem" : "CPF inválido."
        });
      }

      else if (this.validacaoCampoVazio(this.#cliente.cpf)) {
        this.#erros.push({
            "campo" : "cpf",
            "mensagem" : "Campo obrigatório ausente."
        });
      }
      if (!this.validaDataNascimento() && !this.validacaoCampoVazio(this.#cliente.dt_nascimento)) {
          this.#erros.push({
            "campo" : "dt_nascimento",
            "mensagem" : "Data de nascimento inválida."
        });
      }
      else if (this.validacaoCampoVazio(this.#cliente.dt_nascimento)) {
        this.#erros.push({
            "campo" : "dt_nascimento",
            "mensagem" : "Campo obrigatório ausente."
        });
      }

      if (!this.validarRendaMensal()) {
          this.#erros.push({
            "campo" : "renda_mensal",
            "mensagem" : "Renda mensal inválida."
        });

      }
      if (!this.validarEstadoCivil()) {
          this.#erros.push({
            "campo" : "estado_civil",
            "mensagem" : "Estado civil inválido."
        });

      }
      return this.#erros;
    }


}
export default ValidaCliente;
