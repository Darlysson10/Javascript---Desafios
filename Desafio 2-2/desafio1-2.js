//Model - regras de negócio. Recebe os dados do Controller, processa-os e envia-os para o Controller. Vai ter as classes e as funções.
class Paciente {
    
    #nome;
    #cpf;
    #dataNascimento; // fazer isso para as outras classes também.

    constructor(nome, cpf, dataNascimento) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }


}

class Consulta {
    constructor(cpf_paciente, data,horaInicial, horaFinal) {
        this.#cpf_paciente = cpf_paciente;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;

    }
}

class Agenda {
    constructor() {
        this.#consultas = [];
    }

    agendarConsulta(consulta) {
        this.#consultas.push(consulta);
    }

    buscarConsulta(cpf, data, horaInicial) { // Retorna o id da consulta no array de consultas da agenda.
        for (let i = 0; i < this.#consultas.length; i++) {
            if (this.#consultas[i].cpf_paciente == cpf && this.#consultas[i].data == data && this.#consultas[i].horaInicial == horaInicial) {
                return i;
            }
        }
        return undefined;
    }

    consultasFuturasPaciente(cpf) {
        let consultas = this.#consultas;
        let consultas_futuras = [];
        for (let i = 0; i < consultas.length; i++) {
            if (consultas[i].cpf_paciente == cpf) {
                if (ValidacaoDataHora.validacaoData(consultas[i].data) == true) {
                    consultas_futuras.push(consultas[i]);
                }
            }
        }
        return consultas_futuras;
    }

    consultasPassadasPaciente(cpf) {
        let consultas = this.#consultas;
        let consultas_passadas = [];
        for (let i = 0; i < consultas.length; i++) {
            if (consultas[i].cpf_paciente == cpf) {
                if (ValidacaoDataHora.validacaoData(consultas[i].data) == false) {
                    consultas_passadas.push(consultas[i]);
                }
            }
        }
        return consultas_passadas;
    }




    cancelarAgendamento(cpf, data, horaInicial) {
        let consulta_id = this.buscarConsulta(cpf, data, horaInicial);
        this.#consultas.splice(consulta_id, 1);
    }

    listarAgenda() {
        return this.#consultas;
        // Chamar na classe de view
    }
}

class CadastroDePacientes {
    constructor() {
        this.#pacientes = [];
    }

    cadastrarPaciente(paciente) {
        this.#pacientes.push(paciente);
    }

    pacientesCadastrados() {
        return this.#pacientes;
    }

    buscarPaciente(cpf) {
        for (let i = 0; i < this.#pacientes.length; i++) {
            if (this.#pacientes[i].cpf == cpf) {
                return i;
            }
        }
    }

    deletarConsultasPaciente(cpf) {
        let consultas = Agenda.consultasPassadasPaciente(cpf);
        for (let i = 0; i < consultas.length; i++) {
            Agenda.cancelarAgendamento(cpf, consultas[i].data, consultas[i].horaInicial);
        }
    }


    deletarPaciente(cpf) {
        //Só chegar aqui se passar das validações. As validações são feitas assim que o usuário envia uma entrada.
        let paciente_id = this.BuscarPaciente(cpf);
        this.deletarConsultasPaciente(cpf);
        this.#pacientes.splice(paciente_id, 1);


    }
    
}

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

class ValidacaoCadastroPaciente {
    static validacaoNome(nome) {
        if (nome.length >= 5) {
            return true;
        }
        return false;
    }

    static validacaoDataNascimento(dataNascimento) {
        // Mudar para luxon
        let data_atual = new Date();
        let data_nascimento = new Date(dataNascimento);
        if (data_nascimento < data_atual) {
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

class ValidacaoExclusaoPaciente {
    // Um paciente com uma consulta agendada futura não pode ser excluído.
    // Se o paciente tiver uma ou mais consultas agendadas passadas, ele pode ser excluído. Nesse caso, os respectivos agendamentos também devem ser excluídos.
    
    static validacaoExclusaoPaciente(cpf) {
        consultas_futuras = Agenda.consultasFuturasPaciente(cpf);
        if (consultas_futuras.length > 0) {
            return false; // retornando false, não apague o paciente
        }
        return true; // retornando true, apague as consultas passadas do paciente numa próxima chamada de método
    }





}

class ValidacaoDataHora {

    static validacaoData(data) {
        let data_atual = new Date();
        let data_consulta = new Date(data);
        if (data_consulta > data_atual) {
            return true;
        }
        return false;
    }

    static validacaoHora(hora) {
        let hora_atual = new Date();
        let hora_consulta = new Date(hora);
        if (hora_consulta > hora_atual) {
            return true;
        }
        return false;
    }

    static validacaoHoraInicialMenorQueHoraFinal(horaInicial, horaFinal) {
        if (horaInicial < horaFinal) {
            return true;
        }
        return false;
    }

    static validacaoHoraInicialHoraFinal(horaInicial_15, horaFinal) { // Verifica se as horas foram definidas em intervalos de 15 minutos.
        let horaFinal_15 = horaFinal % 100;
        if (horaInicial_15 == 0 || horaInicial_15 == 15 || horaInicial_15 == 30 || horaInicial_15 == 45) {
            if (horaFinal_15 == 0 || horaFinal_15 == 15 || horaFinal_15 == 30 || horaFinal_15 == 45) {
                return true;
            }
        }
        return false;
    }

    static validacaoHoraInicialHoraFinalLimite(horaInicial, horaFinal) {
        if (horaInicial >= 800 && horaInicial <= 1900 && horaFinal >= 800 && horaFinal <= 1900) {
            return true;
        }
        return false;
    }

    static validacaoDataHora(data, horaInicial, horaFinal) {
        if (!this.validacaoData(data) || !this.validacaoHora(horaInicial) || !this.validacaoHora(horaFinal) || !this.validacaoHoraInicialMenorQueHoraFinal(horaInicial, horaFinal) || !this.validacaoHoraInicialHoraFinal(horaInicial, horaFinal) || !this.validacaoHoraInicialHoraFinalLimite(horaInicial, horaFinal)) {
            return false;
        }
        return true;
    }
}

class ValidacaoAgenda {

    static validacaoAgendamentoExistente(cpf, data, horaInicial) {
        let consulta_id = Agenda.buscarConsulta(cpf, data, horaInicial);
        if (consulta_id === undefined) {
            return false;
        }
        return true;
    }


// Abaixo estão os métodos para validar o angendamento ou cancelamento do agendamento
    static ValidacaoAgendamentoConsulta(cpf, data, horaInicial, horaFinal) {
        if (!this.validacaoDataHora(data, horaInicial, horaFinal) || !this.validacaoAgendamentoExistente(cpf, data, horaInicial, horaFinal)) {
            return false;
        }
        return true;
    }

    static ValidacaoCancelamentoAgendamento(cpf, data, horaInicial, horaFinal) {
        if (!this.validacaoDataHora(data, horaInicial, horaFinal) || this.validacaoAgendamentoExistente(cpf, data, horaInicial, horaFinal) || !ValidacaoCPF.validacaoCPFExistente(cpf)) {
            return false;
        }
        return true;
    }

}



//Continuar validações a partir da parte de exclusão de pacientes.




//View - Define a interface com o usuário. Recebe os dados e os envia para o Controller.



//Controller - Recebe os dados da View, processa-os e envia-os para o Model. Também recebe dados do Model e os envia para a View. Vai chamar as funções do Model e da View.

