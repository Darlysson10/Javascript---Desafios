const AgendaBD = require('../models bd/AgendaBD');
class Consulta {
    
    #cpf_paciente;
    #data;
    #horaInicial;
    #horaFinal;
    #tempo;

    constructor(cpf_paciente, data,horaInicial, horaFinal, tempo) {
        this.#cpf_paciente = cpf_paciente;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#tempo = tempo;

    }

    get cpf_paciente() {
        return this.#cpf_paciente;
    }

    get data() {
        return this.#data;
    }

    get horaInicial() {
        return this.#horaInicial;
    }

    get horaFinal() {
        return this.#horaFinal;
    }

    get tempo() {
        return this.#tempo;
    }

    async AddConsultaDB() {
        try{
            await AgendaBD.create({
                cpf: this.cpf_paciente,
                data: this.data,
                horaInicial: this.horaInicial,
                horaFinal: this.horaFinal,
                tempo: this.tempo
            });
        }
        catch(err){
            throw new Error("Erro ao cadastrar consulta no banco de dados", err);
        }

    }

    static async ExcluirConsultaDB(cpf_paciente, data, horaInicial) {
        try{
            await AgendaBD.destroy({
                where: {
                    cpf: cpf_paciente,
                    data: data,
                    horaInicial: horaInicial
                }
            });
        }
        catch(err){
            throw new Error("Erro ao excluir consulta do banco de dados", err);
        }
    }

    static async ConsultaPacienteDB(cpf) {
        try{
            const consultas = await AgendaBD.findAll({ where: { cpf: cpf } });
            return consultas;
        }
        catch(err){
            throw new Error("Erro ao consultar agenda do banco de dados", err);
        }
    }

    static async ConsultaAgendaDB() {
        try{
            const consultas = await AgendaBD.findAll();
            return consultas;
        }
        catch(err){
            throw new Error("Erro ao consultar agenda do banco de dados", err);
        }
    }

    static async ConsultaAgendaPeriodoDB() {
        try{
            const consultas = await AgendaBD.findAll({ order: ['data', 'horaInicial'] });
            return consultas;
        }
        catch(err){
            throw new Error("Erro ao consultar agenda do banco de dados", err);
        }
    }



    
}
module.exports = Consulta;