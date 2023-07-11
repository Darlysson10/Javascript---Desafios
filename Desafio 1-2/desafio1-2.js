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
    
    #cpf_paciente;
    #data;
    #horaInicial;
    #horaFinal;

    constructor(cpf_paciente, data,horaInicial, horaFinal) {
        this.#cpf_paciente = cpf_paciente;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;

    }
}

class Agenda {
    
    #consultas;
    
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

    deletarConsultasPaciente(cpf) {
        let consultas = this.consultasPassadasPaciente(cpf);
        for (let i = 0; i < consultas.length; i++) {
            this.cancelarAgendamento(cpf, consultas[i].data, consultas[i].horaInicial);
        }
    }

    static getAgendaToda() {
        //retorna toda a agenda ordenada por data e hora inicial
        let consultas = this.#consultas;
        consultas.sort(function (a, b) {
            return a.data.localeCompare(b.data) || a.horaInicial - b.horaInicial;
        });
        return consultas;
    }

    static getAgendaPeriodo(dataInicial, dataFinal) {
        //listagem da agenda ordenada por data e hora inicial, considerando apenas as consultas que estão dentro do período informado
        let consultas = this.getAgendaToda();
        let consultas_periodo = [];
        for (let i = 0; i < consultas.length; i++) {
            if (consultas[i].data >= dataInicial && consultas[i].data <= dataFinal) {
                consultas_periodo.push(consultas[i]);
            }
        }
        return consultas_periodo;
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


    deletarPaciente(cpf) {
        //Só chegar aqui se passar das validações. As validações são feitas assim que o usuário envia uma entrada.
        let paciente_id = this.BuscarPaciente(cpf);
        Agenda.deletarConsultasPaciente(cpf);
        this.#pacientes.splice(paciente_id, 1);
    }

    static getPacientesCPF() {
        //retorna os pacientes ordenados por cpf
        let pacientes = this.pacientesCadastrados();
        pacientes.sort(function (a, b) {
            return a.cpf - b.cpf;
        });
        return pacientes;

    }

    static getPacientesNome() {
        //retorna os pacientes ordenados por nome
        let pacientes = this.pacientesCadastrados();
        pacientes.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
        });
        return pacientes;
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
        /*let data_atual = new Date();
        let data_nascimento = new Date(dataNascimento);*/
        let data_atual = DateTime.now();
        let data_nascimento = DateTime.fromISO(dataNascimento);
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

const { DateTime } = require("luxon");
class ValidacaoDataHora {

    static validacaoData(data) {
        /*let data_atual = new Date();
        let data_consulta = new Date(data);*/
        let data_atual = DateTime.now();
        let data_consulta = DateTime.fromISO(data);
        if (data_consulta > data_atual) {
            return true;
        }
        return false;
    }

    static validacaoHora(hora) {
        /*let hora_atual = new Date();
        let hora_consulta = new Date(hora);*/
        let hora_atual = DateTime.now().hour;
        let hora_consulta = DateTime.fromISO(hora).hour;
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


// O método abaixo é utilizado tanto para o agendamento quanto para o cancelamento de um agendamento.
    static ValidacaoAgenda(cpf, data, horaInicial, horaFinal) {
        if (!this.validacaoDataHora(data, horaInicial, horaFinal) || !this.validacaoAgendamentoExistente(cpf, data, horaInicial, horaFinal) || !ValidacaoCPF.validacaoCPFExistente(cpf)) {
            return false;
        }
        return true;
    }

}
class Menus {
    static menuPrincipal() {
        console.log("Menu Principal");
        console.log("1 - Cadastro de Paciente");
        console.log("2 - Agenda");
        console.log("3 - Fim");
    }

    static menuCadastroPaciente() {
        console.log("Menu Cadastro de Paciente");
        console.log("1 - Cadastrar novo Paciente");
        console.log("2 - Excluir Paciente");
        console.log("3 - Listar Pacientes (ordenado por CPF)")
        console.log("4 - Listar Pacientes (ordenado por nome)");
        console.log("5 - Voltar p/ menu principal");
    }

    static menuAgenda() {
        console.log("Agenda");
        console.log("1 - Agendar Consulta");
        console.log("2 - Cancelar Consulta");
        console.log("3 - Listar Agenda");
        console.log("4 - Voltar p/ menu principal");
    }
}

class Listagem {
    static listarPacientesCPF() {
        let pacientes = CadastroDePacientes.getPacientesCPF();
        for (let i = 0; i < pacientes.length; i++) {
            console.log(pacientes[i].nome + " - " + pacientes[i].cpf + " - " + pacientes[i].dataNascimento);
        }
    }

    static listarAgendamentosPaciente(cpf) {
        let consultas = Agenda.consultasFuturasPaciente(cpf);
        for (let i = 0; i < consultas.length; i++) {
            console.log("Agendado para:"+ consultas[i].data + "\n" + consultas[i].horaInicial + " às " + consultas[i].horaFinal);
        }
    }

    static listarPacientesNome() {
        let pacientes = CadastroDePacientes.getPacientesNome();
        for (let i = 0; i < pacientes.length; i++) {
            console.log(pacientes[i].nome + " - " + pacientes[i].cpf + " - " + pacientes[i].dataNascimento);
            //listar agendamentos caso o paciente tenha consultas agendadas
            if (Agenda.consultasFuturasPaciente(pacientes[i].cpf).length > 0) {
                console.log("Consultas Futuras:");
                this.listarAgendamentosPaciente(pacientes[i].cpf);
            }
        }
    }

    static listarAgenda() {
        let consultas = Agenda.getAgendaToda();
        for (let i = 0; i < consultas.length; i++) {
            console.log(consultas[i].cpf_paciente + " - " + consultas[i].data + " - " + consultas[i].horaInicial + " - " + consultas[i].horaFinal);
        }
    }

    static listarAgendaPeriodo(dataInicial, dataFinal) {
        let consultas = Agenda.getAgendaPeriodo(dataInicial, dataFinal);
        for (let i = 0; i < consultas.length; i++) {
            console.log(consultas[i].cpf_paciente + " - " + consultas[i].data + " - " + consultas[i].horaInicial + " - " + consultas[i].horaFinal);
        }
    }
}

//View - Define a interface com o usuário. Recebe os dados e os envia para o Controller.



//Controller - Recebe os dados da View, processa-os e envia-os para o Model. Também recebe dados do Model e os envia para a View. Vai chamar as funções do Model e da View.

