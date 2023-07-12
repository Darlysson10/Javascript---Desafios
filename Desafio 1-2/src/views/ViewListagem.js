class ViewListagem {
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
module.exports = ViewListagem;