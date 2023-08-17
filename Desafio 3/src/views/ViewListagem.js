const cadastroDePacientes = require('../models/CadastroDePacientes');
const agenda = require('../models/Agenda');
const ValidacaoAgenda = require('../models/ValidacaoAgenda');
const ValidacaoDataHora = require('../models/ValidacaoDataHora');
const PacienteBD = require('../models bd/PacienteBD');
const AgendaBD = require('../models bd/AgendaBD');
class ViewListagem {
    

    static async listarPacientesCPF() {
        
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        const pacientesCPF = await PacienteBD.findAll({ order: ['cpf'] });
        const consultas = await AgendaBD.findAll();
        
        pacientesCPF.forEach(paciente => {
            paciente.dataNascimento = ValidacaoDataHora.formatarDataOutput(paciente.dataNascimento);
            console.log(paciente.cpf.padEnd(20), paciente.nome.padEnd(20), paciente.dataNascimento.padEnd(20), paciente.idade);
            //listar agendamentos caso o paciente tenha consultas agendadas
            if (consultas.find(consulta => consulta.cpf === paciente.cpf)) {
                console.log("Consultas Futuras:");
                let consultasPaciente = consultas.filter(consulta => consulta.cpf === paciente.cpf);
                this.listarAgendamentosPaciente(consultasPaciente);
            }
            

        });
    }

    static listarAgendamentosPaciente(consultas) {
        consultas.forEach(consulta => {
            consulta.data = ValidacaoDataHora.formatarDataOutput(consulta.data);
            consulta.horaInicial = ValidacaoDataHora.formatarHoraOutput(consulta.horaInicial);
            consulta.horaFinal = ValidacaoDataHora.formatarHoraOutput(consulta.horaFinal);
            console.log("Agendado para: "+ consulta.data + " das " + consulta.horaInicial + " às " + consulta.horaFinal);
        });
    }
    
    static async listarPacientesNome() {
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        // Mudar para uma consulta de pacientes ordenados por nome
        const pacientesNome = await PacienteBD.findAll({ order: ['nome'] });
        const consultas = await AgendaBD.findAll();
        pacientesNome.forEach(paciente => {
            paciente.dataNascimento = ValidacaoDataHora.formatarDataOutput(paciente.dataNascimento);
            console.log(paciente.cpf.padEnd(20), paciente.nome.padEnd(20), paciente.dataNascimento.padEnd(20), paciente.idade);
            if (consultas.find(consulta => consulta.cpf === paciente.cpf)) {
                console.log("Consultas Futuras:");
                let consultasPaciente = consultas.filter(consulta => consulta.cpf === paciente.cpf);
                this.listarAgendamentosPaciente(consultasPaciente);
            }
        });
    }

    static async listarAgenda() {
        const consultas = await AgendaBD.findAll();
        const pacientes = await PacienteBD.findAll();
        this.imprimeConsultas(consultas, pacientes);

    }

    static imprimeConsultas(consultas, pacientes) {
        console.log('---------------------------------------------------------------------');
        console.log("Data".padEnd(10), "H.Ini".padEnd(5), "H.Fim".padEnd(5), "Tempo".padEnd(5), "Nome".padEnd(20), "Dt.Nasc");
        console.log('---------------------------------------------------------------------');
        consultas.forEach(consulta => {
            consulta.data = ValidacaoDataHora.formatarDataOutput(consulta.data);
            consulta.horaInicial = ValidacaoDataHora.formatarHoraOutput(consulta.horaInicial);
            consulta.horaFinal = ValidacaoDataHora.formatarHoraOutput(consulta.horaFinal);
            let nome = pacientes.find(paciente => paciente.cpf === consulta.cpf).nome;
            let dataNascimento = pacientes.find(paciente => paciente.cpf === consulta.cpf).dataNascimento;
            console.log(consulta.data.padEnd(10), consulta.horaInicial.padEnd(5), consulta.horaFinal.padEnd(5), nome.padEnd(20), dataNascimento.padEnd(8), consulta.tempo);
        });
    }


    static async listarAgendaPeriodo(dataInicial, dataFinal) {
        const consultas = await AgendaBD.findAll({ order: ['data', 'horaInicial'] });
        const pacientes = await PacienteBD.findAll();
        dataInicial = ValidacaoDataHora.formatarDataInputBanco(dataInicial);
        dataFinal = ValidacaoDataHora.formatarDataInputBanco(dataFinal);
        this.imprimeConsultas(consultas.filter(consulta => consulta.data >= dataInicial && consulta.data <= dataFinal), pacientes);
        
    }
}
module.exports = ViewListagem;