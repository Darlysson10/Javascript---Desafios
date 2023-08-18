const { DateTime } = require("luxon");
const PacienteBD = require('../models bd/PacienteBD');

//Aplicar o sequelize
class Paciente {
    
    #nome;
    #cpf;
    #dataNascimento;
    #idade;

    constructor(nome, cpf, dataNascimento, idade) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
        this.#idade = idade
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

    get idade() {
        return this.#idade;
    }


    static calcularIdade(dataNascimento) {
        return DateTime.now().diff(DateTime.fromISO(dataNascimento), 'years').years;
    }

    async AddPacienteDB() {
        try{
            await PacienteBD.create({
                nome: this.nome,
                cpf: this.cpf,
                dataNascimento: this.dataNascimento,
                idade: this.idade
            });
        }
        catch(err){
            throw new Error("Erro ao cadastrar paciente no banco de dados", err);
        }

    }

    static async ExcluirPacienteDB(cpf) {
        try{
            await PacienteBD.destroy({
                where: {
                    cpf: cpf
                }
            });
        }
        catch(err){
            throw new Error("Erro ao excluir paciente do banco de dados", err);
        }

    }

    static async listarPacientesCPF() {
        try{
            const pacientesCPF = await PacienteBD.findAll({ order: ['cpf'] });
            return pacientesCPF;
        }
        catch(err){
            throw new Error("Erro ao consultar pacientes por cpf", err);
        }
    }

    static async listarPacientesNome() {
        try{
            const pacientesNome = await PacienteBD.findAll({ order: ['nome'] });
            return pacientesNome;
        }
        catch(err){
            throw new Error("Erro ao consultar pacientes por nome", err);
        }
    }

    static async BuscarPacienteCPF(cpf) {
        try{
            const paciente = await PacienteBD.findOne({ where: { cpf: cpf } });
            return paciente;
        }
        catch(err){
            throw new Error("Erro ao consultar paciente por cpf", err);
        }
    }



}
module.exports = Paciente;