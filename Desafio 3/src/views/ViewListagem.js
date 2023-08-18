const ValidacaoDataHora = require('../models/ValidacaoDataHora');
const Paciente = require('../models/Paciente');
const Consulta = require('../models/Consulta');
class ViewListagem {
    

    static async listarPacientesCPF() {
        
        console.log('---------------------------------------------------------------------');
        console.log("CPF".padEnd(20), "Nome".padEnd(20), "Data de Nascimento".padEnd(20), "Idade");
        console.log('---------------------------------------------------------------------');
        const pacientesCPF = await Paciente.listarPacientesCPF();
        const consultas = await Consulta.ConsultaAgendaDB();
        
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
        const pacientesNome = await Paciente.listarPacientesNome();
        const consultas = await Consulta.ConsultaAgendaDB();
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
        const consultas = await Consulta.ConsultaAgendaDB();
        const pacientes = await Paciente.listarPacientesCPF();
        this.imprimeConsultas(consultas, pacientes);

    }

    static imprimeConsultas(consultas, pacientes) {
        console.log('---------------------------------------------------------------------');
        console.log("Data".padEnd(10), "H.Ini".padEnd(5), "H.Fim".padEnd(5), "Nome".padEnd(20), "Dt.Nasc".padEnd(8),"Tempo");
        console.log('---------------------------------------------------------------------');
        consultas.forEach(consulta => {
            consulta.data = ValidacaoDataHora.formatarDataOutput(consulta.data);
            consulta.horaInicial = ValidacaoDataHora.formatarHoraOutput(consulta.horaInicial);
            consulta.horaFinal = ValidacaoDataHora.formatarHoraOutput(consulta.horaFinal);
            let nome = pacientes.find(paciente => paciente.cpf === consulta.cpf).nome;
            let dataNascimento = pacientes.find(paciente => paciente.cpf === consulta.cpf).dataNascimento;
            dataNascimento = ValidacaoDataHora.formatarDataOutput(dataNascimento);
            console.log(consulta.data.padEnd(10), consulta.horaInicial.padEnd(5), consulta.horaFinal.padEnd(5), nome.padEnd(20), dataNascimento.padEnd(8), consulta.tempo);
        });
    }


    static async listarAgendaPeriodo(dataInicial, dataFinal) {
        const consultas = await Consulta.ConsultaAgendaPeriodoDB();
        const pacientes = await Paciente.listarPacientesCPF();
        dataInicial = ValidacaoDataHora.formatarDataInputBanco(dataInicial);
        dataFinal = ValidacaoDataHora.formatarDataInputBanco(dataFinal);
        this.imprimeConsultas(consultas.filter(consulta => consulta.data >= dataInicial && consulta.data <= dataFinal), pacientes);
        
    }
}
module.exports = ViewListagem;