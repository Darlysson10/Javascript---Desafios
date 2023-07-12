// Guarda os pacientes cadastrados e os métodos para manipulá-los
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
module.exports = CadastroDePacientes;