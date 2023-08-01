import { Input } from "../Utils/Input";
import { Output } from "../Utils/Output";
import { ConversorController } from "../Controller/ConversorController";
export class ConversorView {
    
    private input: Input;
    private output: Output;

    constructor(){
        this.input = new Input();
        this.output = new Output();
    }

    public showMenu(): void {
        
        for(; ;){
            this.output.writeLine("Bem vindo ao conversor de moedas");
            this.output.writeLine("Digite a moeda de origem, a moeda de destino e o valor a ser convertido");
            this.output.writeLine("Exemplo: USD BRL 100");
            this.output.writeLine("Digite 'sair' para sair do programa");
            
            const moedaOrigem :string = this.input.readLine("Digite a moeda de origem: ");
            if(moedaOrigem === "sair"){
                break;
            }
            
            const moedaDestino: string = this.input.readLine("Digite a moeda de destino: ");
            if(moedaDestino === "sair"){
                break;
            }

            //TODO: Validação de moedas
            
            const valor: number = this.input.readNumber("Digite o valor a ser convertido: ");
            const conversorController = new ConversorController(moedaOrigem, moedaDestino, valor);
            const resultado: number = conversorController.converter();
            this.output.writeLine(`O valor convertido é: ${resultado}`);
            
        }
    }

}