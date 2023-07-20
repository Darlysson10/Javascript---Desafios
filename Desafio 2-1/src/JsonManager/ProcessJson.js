function ProcessJson(){
    
    this.JsonInputter = () => {
        
        const fs = require('fs');
        const file = process.argv[2];
        const data = fs.readFileSync(file, 'utf8');
        const json = JSON.parse(data);
        return json;
    }

    this.JsonToObj = (ClientesJson) => {
        const Cliente = require("../Classes/Cliente");
        const listaClientes = require("../Classes/ListaClientes");
    
        for (let i = 0; i < ClientesJson.length; i++) {
            const cliente = new Cliente(ClientesJson[i].nome, ClientesJson[i].cpf, ClientesJson[i].dt_nascimento, ClientesJson[i].renda_mensal, ClientesJson[i].estado_civil);
            listaClientes.inserir(cliente);
        }
        return listaClientes;
    }

    this.JsonOutputter = (listaClientes) => {
        const fs = require('fs');
        const file = process.argv[3];
        const data = JSON.stringify(listaClientes);
        fs.writeFileSync(file, data);
    }
}
module.exports = ProcessJson;