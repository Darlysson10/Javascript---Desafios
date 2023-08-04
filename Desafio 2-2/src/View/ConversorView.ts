import { Input } from "../Utils/Input";
import { Output } from "../Utils/Output";
import { OperationStatus, OperationErrors } from "../Controller/operationCodes";
import { IConversorView } from "../Interfaces/IConversorView";
/**
 * Classe responsável por gerenciar a interação do usuário com o conversor de moedas.
 * Implementa a interface IConversorView.
 */
export class ConversorView implements IConversorView {
    
    private input: Input;
    private output: Output;
    private messages: Map<number, string>;

      /**
     * Construtor da classe ConversorView.
     * Inicializa as instâncias de Input e Output para interagir com o usuário.
     * Inicializa as mensagens de erro em um mapa.
     */
    constructor(){
        this.input = new Input();
        this.output = new Output();
        this.messages = new Map();

        this.setupmessages();
    }
        /**
     * Configura as mensagens de erro no mapa.
     */
    private setupmessages(): void{
        this.messages.set(OperationErrors.INVALID_CURRENCY, "ERRO: Moeda inválida ou inexistente");
        this.messages.set(OperationErrors.INVALID_VALUE, "ERRO: Valor inválido");
        this.messages.set(OperationErrors.INVALID_CURRENCY_SIZE, "ERRO: Moeda deve ser composta por 3 caracteres");
        this.messages.set(OperationErrors.SAME_CURRENCY, "ERRO: As moedas são iguais");
    }
        /**
     * Exibe os erros ocorridos durante a conversão, se houver.
     * @param {number} status - O status da operação (sucesso ou falha).
     * @param {number} error - O código do erro, caso ocorra.
     */
    public showErrors(status: number, error: number): void{

        if (status === OperationStatus.FAILURE) {
            this.output.writeLine(this.messages.get(error) || "Erro desconhecido");
        }
            
    }
        /**
     * Exibe o resultado da conversão de moedas.
     * @param {number} result - O valor convertido.
     * @param {string} moedaDestino - A moeda de destino para a conversão.
     */
    public showResult (result: number, taxa: number, moedaDestino: string): void{
        this.output.writeLine(`O valor convertido é ${result} ${moedaDestino}`);
        this.output.writeLine(`A taxa de conversão é ${taxa}`);

    }

        /**
     * Obtém as entradas do usuário para a conversão de moedas.
     * @returns {Object} Um objeto contendo a moeda de origem, a moeda de destino e o valor a ser convertido.
     */

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
            // Retorna as moedas em letras maiúsculas
            return {moedaOrigem: moedaOrigem.toUpperCase(), moedaDestino: moedaDestino.toUpperCase(), valor};
    }

}