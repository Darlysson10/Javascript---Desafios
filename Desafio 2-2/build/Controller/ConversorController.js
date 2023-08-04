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
exports.ConversorController = void 0;
const Conversor_1 = require("../Model/Conversor");
const operationCodes_1 = require("./operationCodes");
/**
 * Classe responsável pelo controle da conversão de moedas.
 * Implementa a interface IConverterController.
 */
class ConversorController {
    /**
     * Construtor da classe ConversorController.
     * @param {string} origem - A moeda de origem para a conversão.
     * @param {string} destino - A moeda de destino para a conversão.
     * @param {number} valor - O valor a ser convertido.
     * @param {Conversor} conversor - O conversor de moedas.
     */
    constructor(origem, destino, valor) {
        this.conversor = new Conversor_1.Conversor(origem, destino, valor);
    }
    /**
     * Verifica se os dados informados pelo usuário são válidos.
     * @returns {any} Um objeto com o status e o erro, caso haja falha.
     *
    */
    canConvert() {
        if (!this.conversor.isValidCurrencySize()) {
            return {
                status: operationCodes_1.OperationStatus.FAILURE,
                error: operationCodes_1.OperationErrors.INVALID_CURRENCY_SIZE
            };
        }
        else if (this.conversor.moedasIguais()) {
            return {
                status: operationCodes_1.OperationStatus.FAILURE,
                error: operationCodes_1.OperationErrors.SAME_CURRENCY
            };
        }
        else if (!this.conversor.isValidCurrency()) {
            return {
                status: operationCodes_1.OperationStatus.FAILURE,
                error: operationCodes_1.OperationErrors.INVALID_CURRENCY
            };
        }
        else if (!this.conversor.isValidValue()) {
            return {
                status: operationCodes_1.OperationStatus.FAILURE,
                error: operationCodes_1.OperationErrors.INVALID_VALUE
            };
        }
        return {
            status: operationCodes_1.OperationStatus.SUCCESS
        };
    }
    /**
  * Realiza a conversão de moedas.
  * @returns {Promise<{valorConvertido: number; taxa: number;  status: number; error: number; }>} Uma promise com o resultado da conversão e com o status e erro, caso haja falha.
  */
    converter() {
        return __awaiter(this, void 0, void 0, function* () {
            const canConvert = this.canConvert();
            if (canConvert.status === operationCodes_1.OperationStatus.FAILURE) {
                return { valorConvertido: 0, taxa: 0, status: canConvert.status, error: canConvert.error };
            }
            yield this.conversor.converter();
            let taxa = this.conversor.getTaxa();
            let valorConvertido = this.conversor.getValorConvertido();
            return { valorConvertido, taxa, status: operationCodes_1.OperationStatus.SUCCESS, error: 0 };
        });
    }
}
exports.ConversorController = ConversorController;
