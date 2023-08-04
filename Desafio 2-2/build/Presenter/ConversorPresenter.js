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
class ConversorPresenter {
    constructor() {
        this.conversorView = new ConversorView_1.ConversorView();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (;;) {
                const { moedaOrigem, moedaDestino, valor } = this.conversorView.getInputs();
                if (moedaOrigem === "sair" || moedaDestino === "sair" || valor === 0) {
                    break;
                }
                const conversorController = new ConversorController_1.ConversorController(moedaOrigem, moedaDestino, valor);
                const result = yield conversorController.converter();
                if (typeof result === 'object') {
                    if (result.status === operationCodes_1.OperationStatus.FAILURE) {
                        this.conversorView.showErrors(result.status, result.error);
                    }
                }
                else {
                    this.conversorView.showResult(result, moedaDestino);
                }
            }
        });
    }
}
exports.ConversorPresenter = ConversorPresenter;
