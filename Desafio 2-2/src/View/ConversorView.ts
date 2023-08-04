import { Input } from "../Utils/Input";
import { Output } from "../Utils/Output";
import { OperationStatus, OperationErrors } from "../Controller/operationCodes";
import { IConversorView } from "../Interfaces/IConversorView";
export class ConversorView implements IConversorView {
    
    private input: Input;
    private output: Output;
    private messages: Map<number, string>;

    constructor(){
        this.input = new Input();
        this.output = new Output();
        this.messages = new Map();

        this.setupmessages();
    }

    private setupmessages(): void{
        this.messages.set(OperationErrors.INVALID_CURRENCY, "ERRO: Moeda inválida ou inexistente");
        this.messages.set(OperationErrors.INVALID_VALUE, "ERRO: Valor inválido");
    }

    public showErrors(status: number, error: number): void{

        if (status === OperationStatus.FAILURE) {
            this.output.writeLine(this.messages.get(error) || "Erro desconhecido");
        }
            
    }

    public showResult (result: number, moedaDestino: string): void{
        this.output.writeLine(`O valor convertido é ${result} ${moedaDestino}`);
    }

    public getInputs(): {moedaOrigem: string, moedaDestino: string, valor: number} {
        
            this.output.writeLine("\nBem vindo ao conversor de moedas");
            this.output.writeLine("Digite a moeda de origem, a moeda de destino e o valor a ser convertido");
            this.output.writeLine("Digite 'sair' em 'moeda' ou 0 em 'valor' para sair do programa");
            
            const moedaOrigem :string = this.input.readLine("Digite a moeda de origem: ");
            if (moedaOrigem === "sair") {
                return {moedaOrigem, moedaDestino: "", valor: 0};
            }           
            const moedaDestino: string = this.input.readLine("Digite a moeda de destino: ");
            if (moedaDestino === "sair") {
                return {moedaOrigem:"", moedaDestino, valor: 0};
            }
            const valor: number = this.input.readNumber("Digite o valor a ser convertido: ");
            if (valor === 0) {
                return {moedaOrigem:"", moedaDestino:"", valor};
            }

            return {moedaOrigem: moedaOrigem.toUpperCase(), moedaDestino: moedaDestino.toUpperCase(), valor};
    }

}