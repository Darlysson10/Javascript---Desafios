const ValidacaoCPF = require("./ValidacaoCPF");
const agenda = require('./Agenda');
const PacienteBD = require('../models bd/PacienteBD');
const AgendaBD = require('../models bd/AgendaBD');
class ValidacaoExclusaoPaciente {
   
    static async validacaoExclusaoPaciente(cpf) {
        try{
            let consultas_futuras = await AgendaBD.findAll({ where: { cpf: cpf } });
            let resultados = [];
            if (consultas_futuras.length > 0) {
                resultados.push(false);// retornando false, não apague o paciente
            }
            if (ValidacaoCPF.validacaoCPFExistente(cpf)) {
                resultados.push(true);
            }
            else{
                resultados.push(false);
            }
            return resultados; // retornando true, os dados do paciente são excluídos
        }
        catch(err){
            throw new Error("Erro ao consultar agenda:", err);
        }
        
    }


}
module.exports = ValidacaoExclusaoPaciente;