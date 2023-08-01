import { Conversor } from "../Model/Conversor";

export class ConversorController{

    private origem :string;
    private destino :string;
    private valor :number;

    constructor(origem:string, destino:string, valor:number){
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
    }
        
    public converter(): number{
        const conversor = new Conversor(this.origem, this.destino, this.valor);
        conversor.converter();
        return conversor.calcularConversao();
    }

    
}