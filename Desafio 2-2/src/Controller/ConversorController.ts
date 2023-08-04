import { Conversor } from "../Model/Conversor";
import { OperationStatus, OperationErrors } from "./operationCodes";
import { IConverterController } from "../Interfaces/IConversorController";

/**
 * Classe responsável pelo controle da conversão de moedas.
 * Implementa a interface IConverterController.
 */
export class ConversorController implements IConverterController{


    private origem :string;
    private destino :string;
    private valor :number;
    private taxa :number;

            /**
     * Construtor da classe ConversorController.
     * @param {string} origem - A moeda de origem para a conversão.
     * @param {string} destino - A moeda de destino para a conversão.
     * @param {number} valor - O valor a ser convertido.
     */

    constructor(origem:string, destino:string, valor:number){
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
        this.taxa = 0;
    }

        /**
     * Verifica se é possível realizar a conversão da moeda.
     * @param {Conversor} conversor - O objeto Conversor contendo as informações da conversão.
     * @returns {Object} Um objeto contendo o status da operação e o código do erro, caso ocorra.
     */
    private setTaxa(taxa: number): void {
        this.taxa = taxa;
    }

    public getTaxa(): number {
        return this.taxa;
    }

    private canConvert(conversor: Conversor): any{
        if(!conversor.isValidCurrency()){
            return {
                status: OperationStatus.FAILURE,
                error: OperationErrors.INVALID_CURRENCY
            }
        }

        else if(!conversor.isValidValue()){
            return {
                status: OperationStatus.FAILURE,
                error: OperationErrors.INVALID_VALUE
            }
        }

        



        return {
            status: OperationStatus.SUCCESS
        }
    }

    private roundValues(resultado: number, taxa: number): {resultado: number, taxa: number} {

        // Arredondar o resultado para 2 casas decimais
        resultado = Math.round(resultado * 100) / 100;
        // arredondar a taxa para 6 casas decimais
        taxa = Math.round(taxa * 1000000) / 1000000;
        return {resultado, taxa};
    }
    
       /**
     * Realiza a conversão de moedas.
     * @returns {Promise<number | { status: number; error: number; }>} O valor convertido ou um objeto com o status e o código do erro.
     */
    
    public async converter(): Promise<number | { status: number; error: number; }> {

        const conversor = new Conversor(this.origem, this.destino, this.valor);
        const canConvert = this.canConvert(conversor);
        if (canConvert.status === OperationStatus.FAILURE) {
            return {status: canConvert.status, error: canConvert.error}
        }
        let resultado = await conversor.converter();
        let taxa = conversor.getTaxa();

        // pega os resulstados arredondados da função roundvalues
        const {resultado: roundedResult, taxa: roundedTaxa} = this.roundValues(resultado, taxa);
        resultado = roundedResult;
        taxa = roundedTaxa;
        
        this.setTaxa(taxa);
        return resultado;

    }

    
}