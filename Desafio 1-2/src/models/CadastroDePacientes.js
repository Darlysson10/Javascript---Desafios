// Guarda os pacientes cadastrados e os métodos para manipulá-los

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


    pacientesCadastrados() {
        const pacientes = this.pacientesCadastro;
        return pacientes;
    }


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
        //Agenda.deletarConsultasPaciente(cpf);
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