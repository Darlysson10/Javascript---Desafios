class ValidacaoResultados{
    static validacaoResultados(resultados) {
        for (let i = 0; i < resultados.length; i++) {
            if (resultados[i] === false) {
                return false;
            }
        }
        return true;
    }
}
module.exports = ValidacaoResultados;