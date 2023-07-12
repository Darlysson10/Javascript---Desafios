const { DateTime } = require("luxon");
class ValidacaoDataHora {

    static validacaoData(data) {
        const data_atual = DateTime.now();
        const data_consulta = DateTime.fromISO(data);
        if (data_consulta > data_atual) {
            return true;
        }
        return false;
    }

    static validacaoHora(hora) {
        const hora_atual = DateTime.now().hour;
        const hora_consulta = DateTime.fromISO(hora).hour;
        if (hora_consulta > hora_atual) {
            return true;
        }
        return false;
    }

    static validacaoHoraInicialMenorQueHoraFinal(horaInicial, horaFinal) {
        if (horaInicial < horaFinal) {
            return true;
        }
        return false;
    }

    static validacaoHoraInicialHoraFinal(horaInicial_15, horaFinal) { // Verifica se as horas foram definidas em intervalos de 15 minutos.
        let horaFinal_15 = horaFinal % 100;
        if (horaInicial_15 == 0 || horaInicial_15 == 15 || horaInicial_15 == 30 || horaInicial_15 == 45) {
            if (horaFinal_15 == 0 || horaFinal_15 == 15 || horaFinal_15 == 30 || horaFinal_15 == 45) {
                return true;
            }
        }
        return false;
    }

    static validacaoHoraInicialHoraFinalLimite(horaInicial, horaFinal) {
        if (horaInicial >= 800 && horaInicial <= 1900 && horaFinal >= 800 && horaFinal <= 1900) {
            return true;
        }
        return false;
    }

    static validacaoDataHora(data, horaInicial, horaFinal) {
        if (!this.validacaoData(data) || !this.validacaoHora(horaInicial) || !this.validacaoHora(horaFinal) || !this.validacaoHoraInicialMenorQueHoraFinal(horaInicial, horaFinal) || !this.validacaoHoraInicialHoraFinal(horaInicial, horaFinal) || !this.validacaoHoraInicialHoraFinalLimite(horaInicial, horaFinal)) {
            return false;
        }
        return true;
    }

    static validacaoDataNascimento(dataNascimento, idade) {
        
        const data_atual = DateTime.now();
        const data_nascimento = DateTime.fromISO(dataNascimento);
        // data de nascimento deve ser menor que a data atual e o paciente deve pelo menos 13 anos
        if (data_nascimento < data_atual && idade >= 13) {
            return true;
        }
        return false;
    }

}
module.exports = ValidacaoDataHora;