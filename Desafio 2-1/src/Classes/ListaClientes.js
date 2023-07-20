class ListaClientes {
    #clientes = [];
    constructor() {
        this.#clientes = [];
    }

    inserir(cliente) {
        this.#clientes.push(cliente);
    }

    listar() {
        for (let i = 0; i < this.#clientes.length; i++) {
            console.log(this.#clientes[i].nome, this.#clientes[i].cpf, this.#clientes[i].telefone, this.#clientes[i].email, this.#clientes[i].endereco);
        }
        // return this.clientes;
    }

}
const listaClientes = new ListaClientes();
module.exports = listaClientes;
