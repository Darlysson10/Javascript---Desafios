const cadastroDePacientes = require('../models/CadastroDePacientes');
const agenda = require('../models/Agenda');
const ValidacaoAgenda = require('../models/ValidacaoAgenda');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
const PacienteBD = require('../models bd/PacienteBD');
class ViewListagem {
    

    static async listarPacientesCPF() {
        // juntar com a função do nome e apenas verificar se foi pedido por cpf ou por nome
        //const pacientes = cadastroDePacientes.getPacientesCPF();
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        // Mudar para uma consulta de pacientes ordenados por cpf
        const pacientesCPF = await PacienteBD.findAll({ order: ['cpf'] });
        pacientesCPF.forEach(paciente => {
            paciente.dataNascimento = ValidacaoDataHora.formatarDataOutput(paciente.dataNascimento);
            console.log(paciente.cpf.padEnd(20), paciente.nome.padEnd(20), paciente.dataNascimento.padEnd(20), paciente.idade);
            //listar agendamentos caso o paciente tenha consultas agendadas
            // if (agenda.consultasFuturasPaciente(paciente.cpf).length > 0) {
            //     console.log("Consultas Futuras:");
            //     this.listarAgendamentosPaciente(paciente.cpf);
            // }
        });
    }

    static listarAgendamentosPaciente(cpf) {
        const consultas = agenda.consultasFuturasPaciente(cpf);
        for (let consulta of consultas) {
            let horaFinal = ValidacaoDataHora.formatarHoraOutput(consulta.horaFinal);
            let horaInicial = ValidacaoDataHora.formatarHoraOutput(consulta.horaInicial);
            console.log("Agendado para:"+ consulta.data + " das " + horaInicial + " às " + horaFinal);
        }
    }
    
    static async listarPacientesNome() {
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        // Mudar para uma consulta de pacientes ordenados por nome
        const pacientesNome = await PacienteBD.findAll({ order: ['nome'] });
        pacientesNome.forEach(paciente => {
            paciente.dataNascimento = ValidacaoDataHora.formatarDataOutput(paciente.dataNascimento);
            console.log(paciente.cpf.padEnd(20), paciente.nome.padEnd(20), paciente.dataNascimento.padEnd(20), paciente.idade);
            //listar agendamentos caso o paciente tenha consultas agendadas
            // if (agenda.consultasFuturasPaciente(paciente.cpf).length > 0) {
            //     console.log("Consultas Futuras:");
            //     this.listarAgendamentosPaciente(paciente.cpf);
            // }
        });
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