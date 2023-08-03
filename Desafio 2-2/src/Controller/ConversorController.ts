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
        
    public async converter(): Promise<number> {
        const conversor = new Conversor(this.origem, this.destino, this.valor);
        const resultado = await conversor.converter();
        return resultado;
    }

    
}