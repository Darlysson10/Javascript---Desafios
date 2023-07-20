const Cliente = require("../Classes/Cliente");
const listaClientes = require("../Classes/ListaClientes");

JsonToObject = (ClientesJson) => {

    for (let i = 0; i < ClientesJson.length; i++) {
        const cliente = new Cliente(ClientesJson[i].nome, ClientesJson[i].cpf, ClientesJson[i].telefone, ClientesJson[i].email, ClientesJson[i].endereco);
        console.log(cliente.nome, cliente.cpf, cliente.telefone, cliente.email, cliente.endereco)
        listaClientes.inserir(cliente);

    }
    return listaClientes;
}
module.exports = JsonToObject;



