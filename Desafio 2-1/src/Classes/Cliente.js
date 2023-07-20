class Cliente {
    
    #nome;
    #cpf;
    #dt_nascimento;
    #renda_mensal;
    #estado_civil;
    
    constructor(nome, cpf, dt_nascimento, renda_mensal, estado_civil){
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dt_nascimento = dt_nascimento;
        this.#renda_mensal = renda_mensal;
        this.#estado_civil = estado_civil;
    }

    get nome(){
        return this.#nome;
    }

    get cpf(){
        return this.#cpf;
    }

    get dt_nascimento(){
        return this.#dt_nascimento;
    }

    get renda_mensal(){
        return this.#renda_mensal;
    }

    get estado_civil(){
        return this.#estado_civil;
    }
   
}
module.exports = Cliente;