import { Conversor } from "../Model/Conversor";
import { OperationStatus, OperationErrors } from "./operationCodes";
import { IConverterController } from "../Interfaces/IConversorController";

/**
 * Classe responsável pelo controle da conversão de moedas.
 * Implementa a interface IConverterController.
 */
export class ConversorController implements IConverterController{


    private conversor: Conversor;

    /**
     * Construtor da classe ConversorController.
     * @param {string} origem - A moeda de origem para a conversão.
     * @param {string} destino - A moeda de destino para a conversão.
     * @param {number} valor - O valor a ser convertido.
     * @param {Conversor} conversor - O conversor de moedas.
     */

    constructor(origem:string, destino:string, valor:number){
        this.conversor = new Conversor(origem, destino, valor);
    }

    /**
     * Verifica se os dados informados pelo usuário são válidos.
     * @returns {any} Um objeto com o status e o erro, caso haja falha.
     *
    */
    private canConvert(): any{
        
        if(!this.conversor.isValidCurrencySize()){
            return {
                status: OperationStatus.FAILURE,
                error: OperationErrors.INVALID_CURRENCY_SIZE
            }
        }

        else if (this.conversor.moedasIguais()){
            return {
                status: OperationStatus.FAILURE,
                error: OperationErrors.SAME_CURRENCY
            }
        }
        
        else if(!this.conversor.isValidCurrency()){
            return {
                status: OperationStatus.FAILURE,
                error: OperationErrors.INVALID_CURRENCY
            }
        }

        else if(!this.conversor.isValidValue()){
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
     * @returns {Promise<{valorConvertido: number; taxa: number;  status: number; error: number; }>} Uma promise com o resultado da conversão e com o status e erro, caso haja falha.
     */
    
    public async converter(): Promise< {valorConvertido: number; taxa: number; status: number; error: number; }> {

        
        const canConvert = this.canConvert();
        if (canConvert.status === OperationStatus.FAILURE) {
            return {valorConvertido: 0, taxa: 0, status: canConvert.status, error: canConvert.error};
        }
        await this.conversor.converter();
        let taxa: number = this.conversor.getTaxa();
        let valorConvertido: number = this.conversor.getValorConvertido();
        return {valorConvertido, taxa, status: OperationStatus.SUCCESS, error: 0};
          
    }

    
}