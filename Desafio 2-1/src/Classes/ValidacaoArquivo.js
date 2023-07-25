class ValidacaoArquivo {
    constructor(arquivo) {
        this.arquivo = arquivo;
    }
    validaArquivo() {
        if (!this.arquivo) {
            return false;
        }
        if (!this.arquivo instanceof Array) {
            return false;
        }
        return true;
    }
}
export default ValidacaoArquivo;
