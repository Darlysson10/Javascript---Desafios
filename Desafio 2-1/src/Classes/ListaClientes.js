class ListaClientes {
    #clientes = [];
    #dadosInvalidos = [];
    constructor() {
        this.#clientes = [];
        this.#dadosInvalidos = [];
    }

    inserir(cliente) {
        this.#clientes.push(cliente);
    }

    inserirInvalido(erro) {
        this.#dadosInvalidos.push(erro);
    }

    get lista() {
        return this.#clientes;
    }

    get dadosErro() {
        return this.#dadosInvalidos || [];
    }

    listar() {
        
        
        // for (let i = 0; i < this.#clientes.length; i++) {
        //     console.log(this.#clientes[i].nome, this.#clientes[i].cpf, this.#clientes[i].dt_nascimento, this.#clientes[i].renda_mensal, this.#clientes[i].estado_civil);
        //     console.log(this.#dadosInvalidos[i]);
        // }
        const clientesComErros = this.#clientes.map((cliente) => {
            return {
                dados: {
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    dt_nascimento: cliente.dt_nascimento,
                    renda_mensal: cliente.renda_mensal,
                    estado_civil: cliente.estado_civil,
                },
                erros: cliente.dadosErro, // Garante que exista o array de erros
            };
        });

        return clientesComErros;
        
    }
}
const listaClientes = new ListaClientes();
module.exports = listaClientes;
