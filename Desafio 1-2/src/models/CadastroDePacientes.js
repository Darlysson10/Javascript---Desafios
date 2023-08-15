// Guarda os pacientes cadastrados e os métodos para manipulá-los
const agenda = require('./Agenda');
class CadastroDePacientes {
    
    #pacientes;

    constructor() {
        this.#pacientes = [];
    }

    get pacientesCadastro()
    {
        return this.#pacientes;
    }

    cadastrarPaciente(paciente) {
    
        this.#pacientes.push(paciente);
 
    }

    //retorna o nome a data de nacimento dos pacientes. Utilizada para criar um objeto consulta.
    pacienteNomeDataNasc(cpf){
        let pacientes = this.pacientesCadastro;
        for(const element of pacientes){
            if(element.cpf === cpf){
                let nome = element.nome;
                let dataNascimento = element.dataNascimento;
                return {nome, dataNascimento};
            }
        }
    }


    pacientesCadastrados() {
        const pacientes = this.pacientesCadastro;
        return pacientes;
    }

    // Retorna o id do paciente no array de pacientes da agenda. Usada para cancelar agendamento e validações.
    buscarPaciente(cpf) {
        const pacientes = this.pacientesCadastro;
        for (let i = 0; i < pacientes.length; i++) {
            if (this.#pacientes[i].cpf === cpf) {
                return i;
            }
        }
    }


    deletarPaciente(cpf) {
        //Só chegar aqui se passar das validações. As validações são feitas assim que o usuário envia uma entrada.
        let paciente_id = this.buscarPaciente(cpf);
        agenda.deletarConsultasPaciente(cpf);
        this.#pacientes.splice(paciente_id, 1);
    }

    getPacientesCPF() {
        //retorna os pacientes ordenados por cpf
        let pacientes = this.pacientesCadastro;
        pacientes.sort(function (a, b) {
            return a.cpf - b.cpf;
        });
        return pacientes;

    }

    getPacientesNome() {
        //retorna os pacientes ordenados por nome
        let pacientes = this.pacientesCadastrados();
        pacientes.sort(function (a, b) {
            return a.nome.localeCompare(b.nome);
        });
        return pacientes;
    }

    
}
const cadastroDePacientes = new CadastroDePacientes();
module.exports = cadastroDePacientes;