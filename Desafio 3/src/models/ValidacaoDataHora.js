const { DateTime } = require("luxon");
const ValidacaoResultados = require("./ValidacaoResultados");
class ValidacaoDataHora {
    // Formata a data de entrada dd/MM/yyyy para criação de um objeto DateTime do luxon.
    static formatarDataInput(data) {
        const formato = 'dd/MM/yyyy';
        let data_formatada = DateTime.fromFormat(data, formato);
        return data_formatada;
    }

    // Deixar a data no formato ddMMyyyy para salvar no banco de dados.
    static formatarDataInputBanco(data) {
        const formato =  'ddMMyyyy'
        let data_formatada = data.toFormat(formato);
        return data_formatada;
    }

    // Formata a data de saída dd/MM/yyyy para listagem de consultas.
    static formatarDataOutput(data) {
        const formato = 'dd/MM/yyyy';
        const dataFormatada = DateTime.fromFormat(data, "ddMMyyyy");
        return dataFormatada.toFormat(formato);
    }

    // // Formata a hora de saída para HH:mm.
    static formatarHoraOutput(hora) {
        const formato = 'HH:mm';
        const horaFormatada = DateTime.fromFormat(hora, "HHmm");
        return horaFormatada.toFormat(formato);
    }

    // Subtração das horas para obtenção do tempo de consulta
    static subtrairHoras(horaInicial, horaFinal) {
        let dt1 = DateTime.fromFormat(horaInicial, "HHmm");
        let dt2 = DateTime.fromFormat(horaFinal, "HHmm");
      
        let diff = dt2.diff(dt1, 'minutes');
        let diffHoras = diff.hours;
        let diffMinutos = diff.minutes;
      
        let resultado = diffHoras * 60 + diffMinutos;
        return resultado;
      }

   //Verifica se a data de consulta é maior que a data atual.
      static validacaoData(data) {
        const data_atual = DateTime.now();
        const data_consulta = DateTime.fromISO(data);
        if (data_consulta > data_atual) {
            return true;
        }
        return false;
    }

    // Verifica se a hora de consulta é maior que a hora atual, caso as datas sejam iguais.
    static validacaoHora(hora, data) {
        let horaAtual = DateTime.local();
        horaAtual = horaAtual.hour;
        let horaConsulta = parseInt(hora.substring(0, 2));
        if (this.validacaoData(data)) {
            return true;
        }

        if (horaConsulta >= horaAtual) {
            return true;
        }
        return false;
        
    }

    // Verifica se a hora inicial é menor que a hora final. Se as horas forem iguais, verifica se os minutos da hora inicial são menores que os minutos da hora final.
    static validacaoHoraInicialMenorQueHoraFinal(horaInicial, horaFinal) {
        let horaInicio = parseInt(horaInicial.substring(0, 2));
        let minutosInicio = parseInt(horaInicial.substring(2, 4));
        let horaFim = parseInt(horaFinal.substring(0, 2));
        let minutosFim = parseInt(horaFinal.substring(2, 4));
    
        if (horaInicio <= horaFim) {
            
            return true;
        }
        else if (minutosInicio < minutosFim) {
            
            return true;
        }
        return false;
    }

   //Verifica se as horas foram definidas em intervalos de 15 minutos.
    static validacaoHoraInicialHoraFinal(horaInicial, horaFinal) {
        let minutosInicio = parseInt(horaInicial.substring(2, 4));
        let minutosFim = parseInt(horaFinal.substring(2, 4));
        if (minutosInicio % 15 == 0 && minutosFim % 15 == 0) {    
            return true;
        }
        return false;
    }

    //Verifica se as horas recebidas estão dentro do limite de funcionamento do consultório.
    static validacaoHoraInicialHoraFinalLimite(horaInicial, horaFinal) {
        let horaInicio = parseInt(horaInicial.substring(0, 2));
        let horaFim = parseInt(horaFinal.substring(0, 2));
        if (horaInicio >= 8 && horaFim <= 19) {
            return true;
        }
        return false;
    }

    // Método geral para verificar se a data e hora de consulta são válidas. O array de resultados é utilizado para imprimir as mensagens de erro corretamente.
    static validacaoDataHora(data, horaInicial, horaFinal) {
        let resultados = [];
        switch (true) {
            case !this.validacaoData(data):
                resultados.push(false);
                break;
            case !this.validacaoHora(horaInicial, data):
                resultados.push(false);
                break;
            case !this.validacaoHora(horaFinal, data):
                resultados.push(false);
                break;
            case !this.validacaoHoraInicialMenorQueHoraFinal(horaInicial, horaFinal):
                resultados.push(false);
                break;
            case !this.validacaoHoraInicialHoraFinal(horaInicial, horaFinal):
                resultados.push(false);
                break;
            case !this.validacaoHoraInicialHoraFinalLimite(horaInicial, horaFinal):
                resultados.push(false);
                break;
            default:
                resultados.push(true);
        }
        return ValidacaoResultados.validacaoResultados(resultados);
        
    }

    // Verifica se a data de nascimento é menor que a data atual e se o paciente tem pelo menos 13 anos.
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