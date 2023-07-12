class ValidacaoExclusaoPaciente {
   
    static validacaoExclusaoPaciente(cpf) {
        consultas_futuras = Agenda.consultasFuturasPaciente(cpf);
        if (consultas_futuras.length > 0) {
            return false; // retornando false, não apague o paciente
        }
        return true; // retornando true, apague as consultas passadas do paciente numa próxima chamada de método
    }


}
module.exports = ValidacaoExclusaoPaciente;