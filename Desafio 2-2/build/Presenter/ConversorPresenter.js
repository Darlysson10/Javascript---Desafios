"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversorPresenter = void 0;
const ConversorView_1 = require("../View/ConversorView");
const ConversorController_1 = require("../Controller/ConversorController");
const operationCodes_1 = require("../Controller/operationCodes");
/**
 * Classe responsável por controlar a interação do usuário com o conversor de moedas.
 * Implementa a interface IConversorPresenter.
 */
class ConversorPresenter {
    /**
 * Construtor da classe ConversorPresenter.
 * Inicializa uma instância de ConversorView para gerenciar a interface do usuário.
 */
    constructor() {
        this.conversorView = new ConversorView_1.ConversorView();
    }
    /**
     * Inicia a execução do conversor de moedas, aguardando entrada do usuário.
     * @returns {Promise<void>} Uma promise vazia que resolve quando a execução é concluída.
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (;;) {
                const { moedaOrigem, moedaDestino, valor } = this.conversorView.getInputs();
                // Verifica se o usuário deseja sair do programa
                if (moedaOrigem === "sair" || moedaDestino === "sair" || valor === 0) {
                    break;
                }
                // Inicializa o controlador de conversão com as moedas e valor informados pelo usuário
                const conversorController = new ConversorController_1.ConversorController(moedaOrigem, moedaDestino, valor);
                const result = yield conversorController.converter();
                // Exibe erros, se houver
                if (typeof result === 'object') {
                    if (result.status === operationCodes_1.OperationStatus.FAILURE) {
                        this.conversorView.showErrors(result.status, result.error);
                    }
                }
                else {
                    // Exibe o resultado da conversão
                    this.conversorView.showResult(result, conversorController.getTaxa(), moedaDestino);
                }
            }
        });
    }
}
exports.ConversorPresenter = ConversorPresenter;
