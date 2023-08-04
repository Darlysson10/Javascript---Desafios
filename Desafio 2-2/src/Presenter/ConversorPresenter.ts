import { ConversorView } from "../View/ConversorView";
import { ConversorController } from "../Controller/ConversorController";
import { OperationStatus, OperationErrors } from "../Controller/operationCodes";
import { IConversorPresenter } from "../Interfaces/IConversorPresenter";

export class ConversorPresenter implements IConversorPresenter {
    
    private conversorView: ConversorView;

    constructor() {
        this.conversorView = new ConversorView();
    }

    public async run(): Promise<void> {

        for (; ;){
            const {moedaOrigem, moedaDestino, valor} = this.conversorView.getInputs();
            if (moedaOrigem === "sair" || moedaDestino === "sair" || valor === 0) {
                break;
            }
            const conversorController = new ConversorController(moedaOrigem, moedaDestino, valor);
            const result = await conversorController.converter();
            if (typeof result === 'object') {
                if (result.status === OperationStatus.FAILURE) {
                    this.conversorView.showErrors(result.status, result.error);
                }
            }
            else {
                this.conversorView.showResult(result, moedaDestino);
            }


        }
    }
}
