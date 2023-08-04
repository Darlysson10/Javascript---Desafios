"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversorView = void 0;
const Input_1 = require("../Utils/Input");
const Output_1 = require("../Utils/Output");
const operationCodes_1 = require("../Controller/operationCodes");
class ConversorView {
    constructor() {
        this.input = new Input_1.Input();
        this.output = new Output_1.Output();
        this.messages = new Map();
        this.setupmessages();
    }
    setupmessages() {
        this.messages.set(operationCodes_1.OperationErrors.INVALID_CURRENCY, "ERRO: Moeda inválida ou inexistente");
        this.messages.set(operationCodes_1.OperationErrors.INVALID_VALUE, "ERRO: Valor inválido");
    }
    showErrors(status, error) {
        if (status === operationCodes_1.OperationStatus.FAILURE) {
            this.output.writeLine(this.messages.get(error) || "Erro desconhecido");
        }
    }
    showResult(result, moedaDestino) {
        this.output.writeLine(`O valor convertido é ${result} ${moedaDestino}`);
    }
    getInputs() {
        this.output.writeLine("\nBem vindo ao conversor de moedas");
        this.output.writeLine("Digite a moeda de origem, a moeda de destino e o valor a ser convertido");
        this.output.writeLine("Digite 'sair' em 'moeda' ou 0 em 'valor' para sair do programa");
        const moedaOrigem = this.input.readLine("Digite a moeda de origem: ");
        if (moedaOrigem === "sair") {
            return { moedaOrigem, moedaDestino: "", valor: 0 };
        }
        const moedaDestino = this.input.readLine("Digite a moeda de destino: ");
        if (moedaDestino === "sair") {
            return { moedaOrigem: "", moedaDestino, valor: 0 };
        }
        const valor = this.input.readNumber("Digite o valor a ser convertido: ");
        if (valor === 0) {
            return { moedaOrigem: "", moedaDestino: "", valor };
        }
        return { moedaOrigem: moedaOrigem.toUpperCase(), moedaDestino: moedaDestino.toUpperCase(), valor };
    }
}
exports.ConversorView = ConversorView;
