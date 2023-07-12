class ValidacaoExclusaoPaciente {
   
    static validacaoExclusaoPaciente(cpf) {
        consultas_futuras = Agenda.consultasFuturasPaciente(cpf);
        resultados = [];
        if (consultas_futuras.length > 0) {
            resultados.push(false);// retornando false, não apague o paciente
        }
        if (!ValidacaoCPF.validacaoCPF(cpf)) {
            resultados.push(false);
        }
        return resultados; // retornando true, apague as consultas passadas do paciente numa próxima chamada de método
    }


}
module.exports = ValidacaoExclusaoPaciente;