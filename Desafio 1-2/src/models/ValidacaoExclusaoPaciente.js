const ValidacaoCPF = require("./ValidacaoCPF");
const agenda = require('./Agenda');
class ValidacaoExclusaoPaciente {
   
    static validacaoExclusaoPaciente(cpf) {
        let consultas_futuras = agenda.consultasFuturasPaciente(cpf);
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


}
module.exports = ValidacaoExclusaoPaciente;