import { ConversorView } from "../View/ConversorView";
import { ConversorController } from "../Controller/ConversorController";
import { OperationStatus, OperationErrors } from "../Controller/operationCodes";
import { IConversorPresenter } from "../Interfaces/IConversorPresenter";

/**
 * Classe responsável por controlar a interação do usuário com o conversor de moedas.
 * Implementa a interface IConversorPresenter.
 */
export class ConversorPresenter implements IConversorPresenter {
    
    private conversorView: ConversorView;

        /**
     * Construtor da classe ConversorPresenter.
     * Inicializa uma instância de ConversorView para gerenciar a interface do usuário.
     */
    constructor() {
        this.conversorView = new ConversorView();
    }

    /**
     * Inicia a execução do conversor de moedas, aguardando entrada do usuário.
     * @returns {Promise<void>} Uma promise vazia que resolve quando a execução é concluída.
     */
    public async run(): Promise<void> {

        for (; ;){
            const {moedaOrigem, moedaDestino, valor} = this.conversorView.getInputs();
             // Verifica se o usuário deseja sair do programa
            if (moedaOrigem === "sair" || moedaDestino === "sair" || valor === 0) {
                break;
            }
            // Inicializa o controlador de conversão com as moedas e valor informados pelo usuário
            const conversorController = new ConversorController(moedaOrigem, moedaDestino, valor);
            // Realiza a conversão
            const result = await conversorController.converter();
            // Exibe erros, se houver
            if (result.error !== 0) {
                if (result.status === OperationStatus.FAILURE) {
                    this.conversorView.showErrors(result.status, result.error);
                }
            }
            else {
                 // Exibe o resultado da conversão
                this.conversorView.showResult(result.valorConvertido, result.taxa,  moedaDestino);
            }


        }
    }
}
