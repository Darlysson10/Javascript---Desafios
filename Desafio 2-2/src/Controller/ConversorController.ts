import { Conversor } from "../Model/Conversor";
import { OperationStatus, OperationErrors } from "./operationCodes";
import { IConverterController } from "../Interfaces/IConversorController";

/**
 * Classe responsável pelo controle da conversão de moedas.
 * Implementa a interface IConverterController.
 */
export class ConversorController implements IConverterController{


    private conversor: Conversor;


    constructor(origem:string, destino:string, valor:number){
        this.conversor = new Conversor(origem, destino, valor);
    }


    private canConvert(): any{
        if(!this.conversor.isValidCurrency()){
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

        else if(!this.conversor.isValidCurrencySize()){
            return {
                status: OperationStatus.FAILURE,
                error: OperationErrors.INVALID_CURRENCY_SIZE
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
    
    public async converter(): Promise< {valorConvertido: number; taxa: number; status: number; error: number; }> {

        
        const canConvert = this.canConvert();
        if (canConvert.status === OperationStatus.FAILURE) {
            return {valorConvertido: 0, taxa: 0, status: canConvert.status, error: canConvert.error};
        }
        await this.conversor.converter();
        let taxa: number = this.conversor.getTaxa();
        let valorConvertido: number = this.conversor.getValorConvertido();
        return {valorConvertido, taxa, status: OperationStatus.SUCCESS, error: 0};
        // pega os resulstados arredondados da função roundvalues
    
        

    }

    
}