const cadastroDePacientes = require('../models/CadastroDePacientes');
const agenda = require('../models/Agenda');
const ValidacaoAgenda = require('../models/ValidacaoAgenda');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
class ViewListagem {
    

    static listarPacientesCPF() {
        // juntar com a função do nome e apenas verificar se foi pedido por cpf ou por nome
        const pacientes = cadastroDePacientes.getPacientesCPF();
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        for (let i = 0; i < pacientes.length; i++) {
            console.log(pacientes[i].cpf.padEnd(20), pacientes[i].nome.padEnd(20), pacientes[i].dataNascimento.padEnd(20), pacientes[i].idade);
            //listar agendamentos caso o paciente tenha consultas agendadas
            if (agenda.consultasFuturasPaciente(pacientes[i].cpf).length > 0) {
                console.log("Consultas Futuras:");
                this.listarAgendamentosPaciente(pacientes[i].cpf);
            }
        }
    }

    static listarAgendamentosPaciente(cpf) {
        const consultas = agenda.consultasFuturasPaciente(cpf);
        for (let i = 0; i < consultas.length; i++) {
            let horaFinal = ValidacaoDataHora.formatarHoraOutput(consultas[i].horaFinal);
            let horaInicial = ValidacaoDataHora.formatarHoraOutput(consultas[i].horaInicial);
            console.log("Agendado para:"+ consultas[i].data + " das " + horaInicial + " às " + horaFinal);
        }
    }
    
    static listarPacientesNome() {
        const pacientes = cadastroDePacientes.getPacientesNome();
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        for (let i = 0; i < pacientes.length; i++) {
            console.log(pacientes[i].cpf.padEnd(20), pacientes[i].nome.padEnd(20), pacientes[i].dataNascimento.padEnd(20), pacientes[i].idade);
            //listar agendamentos caso o paciente tenha consultas agendadas
            if (agenda.consultasFuturasPaciente(pacientes[i].cpf).length > 0) {
                console.log("Consultas Futuras:");
                this.listarAgendamentosPaciente(pacientes[i].cpf);
            }
        }
    }

    static listarAgenda() {
        const consultas = agenda.getAgendaToda();
        console.log('---------------------------------------------------------------------');
        console.log("Data".padEnd(10), "H.Ini".padEnd(5), "H.Fim".padEnd(5), "Tempo".padEnd(5), "Nome".padEnd(20), "Dt.Nasc");
        console.log('---------------------------------------------------------------------');
        for (let i = 0; i < consultas.length; i++) {
            let horaFinal = ValidacaoDataHora.formatarHoraOutput(consultas[i].horaFinal);
            let horaInicial = ValidacaoDataHora.formatarHoraOutput(consultas[i].horaInicial);
            console.log(consultas[i].data.padEnd(10), horaInicial.padEnd(5), horaFinal.padEnd(5), consultas[i].tempo,"  ", consultas[i].nome.padEnd(20), consultas[i].dataNascimento);
        }
    }

    static listarAgendaPeriodo(dataInicial, dataFinal) {
        let consultas = agenda.getAgendaPeriodo(dataInicial, dataFinal);
        console.log('---------------------------------------------------------------------');
        console.log("Data".padEnd(10), "H.Ini".padEnd(5), "H.Fim".padEnd(5), "Tempo".padEnd(5), "Nome".padEnd(20), "Dt.Nasc");
        console.log('---------------------------------------------------------------------');
        for (let i = 0; i < consultas.length; i++) {
            let horaFinal = ValidacaoDataHora.formatarHoraOutput(consultas[i].horaFinal);
            let horaInicial = ValidacaoDataHora.formatarHoraOutput(consultas[i].horaInicial);
            console.log(consultas[i].data.padEnd(10), horaInicial.padEnd(5), horaFinal.padEnd(5), consultas[i].tempo,"  ", consultas[i].nome.padEnd(20), consultas[i].dataNascimento);
        }
    }
}
module.exports = ViewListagem;