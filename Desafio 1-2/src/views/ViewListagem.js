const cadastroDePacientes = require('../models/CadastroDePacientes');
const agenda = require('../models/Agenda');
class ViewListagem {
    
    // Função auxiliar para adicionar espaços à esquerda de um valor
    static listarPacientesCPF() {
        // juntar com a função do nome e apenas verificar se foi pedido por cpf ou por nome
        let pacientes = cadastroDePacientes.getPacientesCPF();
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        for (let i = 0; i < pacientes.length; i++) {
            console.log(pacientes[i].cpf.padEnd(20), pacientes[i].nome.padEnd(20), pacientes[i].dataNascimento.padEnd(20), pacientes[i].idade);
            //listar agendamentos caso o paciente tenha consultas agendadas
            if (Agenda.consultasFuturasPaciente(pacientes[i].cpf).length > 0) {
                console.log("Consultas Futuras:");
                this.listarAgendamentosPaciente(pacientes[i].cpf);
            }
        }
    }

    static listarAgendamentosPaciente(cpf) {
        let consultas = Agenda.consultasFuturasPaciente(cpf);
        for (let i = 0; i < consultas.length; i++) {
            console.log("Agendado para:"+ consultas[i].data + "\n" + consultas[i].horaInicial + " às " + consultas[i].horaFinal);
        }
    }
    
    static listarPacientesNome() {
        let pacientes = cadastroDePacientes.getPacientesNome();
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        for (let i = 0; i < pacientes.length; i++) {
            console.log(pacientes[i].cpf.padEnd(20), pacientes[i].nome.padEnd(20), pacientes[i].dataNascimento.padEnd(20), pacientes[i].idade);
            //listar agendamentos caso o paciente tenha consultas agendadas
            if (Agenda.consultasFuturasPaciente(pacientes[i].cpf).length > 0) {
                console.log("Consultas Futuras:");
                this.listarAgendamentosPaciente(pacientes[i].cpf);
            }
        }
    }

    static listarAgenda() {
        let consultas = agenda.getAgendaToda();
        for (let i = 0; i < consultas.length; i++) {
            console.log(consultas[i].cpf_paciente + " - " + consultas[i].data + " - " + consultas[i].horaInicial + " - " + consultas[i].horaFinal);
        }
    }

    static listarAgendaPeriodo(dataInicial, dataFinal) {
        let consultas = agenda.getAgendaPeriodo(dataInicial, dataFinal);
        for (let i = 0; i < consultas.length; i++) {
            console.log(consultas[i].cpf_paciente + " - " + consultas[i].data + " - " + consultas[i].horaInicial + " - " + consultas[i].horaFinal);
        }
    }
}
module.exports = ViewListagem;