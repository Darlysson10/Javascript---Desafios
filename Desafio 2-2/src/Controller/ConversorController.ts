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
    }

        /**
     * Verifica se é possível realizar a conversão da moeda.
     * @param {Conversor} conversor - O objeto Conversor contendo as informações da conversão.
     * @returns {Object} Um objeto contendo o status da operação e o código do erro, caso ocorra.
     */

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
        const resultado = await conversor.converter();
        return resultado;

    }

    
}