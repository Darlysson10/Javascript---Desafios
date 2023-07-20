function GetErrors(){
    
    
    this.ErrorCPF = () => {
        
        const error = {
            "campo" : "cpf",
            "mensagem" : "CPF inválido."
        }
        return error;
    }

    this.ErrorName = () => {
            
            const error = {
                "campo" : "nome",
                "mensagem" : "Nome inválido."
            }
            return error;
        }
}
module.exports = GetErrors;