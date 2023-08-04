"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversorView = void 0;
const Input_1 = require("../Utils/Input");
const Output_1 = require("../Utils/Output");
const operationCodes_1 = require("../Controller/operationCodes");
/**
 * Classe responsável por gerenciar a interação do usuário com o conversor de moedas.
 * Implementa a interface IConversorView.
 */
class ConversorView {
    /**
   * Construtor da classe ConversorView.
   * Inicializa as instâncias de Input e Output para interagir com o usuário.
   * Inicializa as mensagens de erro em um mapa.
   */
    constructor() {
        this.input = new Input_1.Input();
        this.output = new Output_1.Output();
        this.messages = new Map();
        this.setupmessages();
    }
    /**
 * Configura as mensagens de erro no mapa.
 */
    setupmessages() {
        this.messages.set(operationCodes_1.OperationErrors.INVALID_CURRENCY, "ERRO: Moeda inválida ou inexistente");
        this.messages.set(operationCodes_1.OperationErrors.INVALID_VALUE, "ERRO: Valor inválido");
    }
    /**
 * Exibe os erros ocorridos durante a conversão, se houver.
 * @param {number} status - O status da operação (sucesso ou falha).
 * @param {number} error - O código do erro, caso ocorra.
 */
    showErrors(status, error) {
        if (status === operationCodes_1.OperationStatus.FAILURE) {
            this.output.writeLine(this.messages.get(error) || "Erro desconhecido");
        }
    }
    /**
 * Exibe o resultado da conversão de moedas.
 * @param {number} result - O valor convertido.
 * @param {string} moedaDestino - A moeda de destino para a conversão.
 */
    showResult(result, taxa, moedaDestino) {
        this.output.writeLine(`O valor convertido é ${result} ${moedaDestino}`);
        this.output.writeLine(`A taxa de conversão é ${taxa}`);
    }
    /**
 * Obtém as entradas do usuário para a conversão de moedas.
 * @returns {Object} Um objeto contendo a moeda de origem, a moeda de destino e o valor a ser convertido.
 */
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
        // Retorna as moedas em letras maiúsculas
        return { moedaOrigem: moedaOrigem.toUpperCase(), moedaDestino: moedaDestino.toUpperCase(), valor };
    }
}
exports.ConversorView = ConversorView;
