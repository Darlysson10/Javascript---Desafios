import { Conversor } from "../Model/Conversor";
import { OperationStatus, OperationErrors } from "./operationCodes";
import { IConverterController } from "../Interfaces/IConversorController";
export class ConversorController implements IConverterController{

    private origem :string;
    private destino :string;
    private valor :number;

    constructor(origem:string, destino:string, valor:number){
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
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