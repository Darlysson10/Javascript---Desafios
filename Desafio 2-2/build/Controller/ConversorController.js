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
*/
    constructor(origem, destino, valor) {
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
        this.taxa = 0;
    }
    /**
 * Verifica se é possível realizar a conversão da moeda.
 * @param {Conversor} conversor - O objeto Conversor contendo as informações da conversão.
 * @returns {Object} Um objeto contendo o status da operação e o código do erro, caso ocorra.
 */
    setTaxa(taxa) {
        this.taxa = taxa;
    }
    getTaxa() {
        return this.taxa;
    }
    canConvert(conversor) {
        if (!conversor.isValidCurrency()) {
            return {
                status: operationCodes_1.OperationStatus.FAILURE,
                error: operationCodes_1.OperationErrors.INVALID_CURRENCY
            };
        }
        else if (!conversor.isValidValue()) {
            return {
                status: operationCodes_1.OperationStatus.FAILURE,
                error: operationCodes_1.OperationErrors.INVALID_VALUE
            };
        }
        return {
            status: operationCodes_1.OperationStatus.SUCCESS
        };
    }
    roundValues(resultado, taxa) {
        // Arredondar o resultado para 2 casas decimais
        resultado = Math.round(resultado * 100) / 100;
        // arredondar a taxa para 6 casas decimais
        taxa = Math.round(taxa * 1000000) / 1000000;
        return { resultado, taxa };
    }
    /**
  * Realiza a conversão de moedas.
  * @returns {Promise<number | { status: number; error: number; }>} O valor convertido ou um objeto com o status e o código do erro.
  */
    converter() {
        return __awaiter(this, void 0, void 0, function* () {
            const conversor = new Conversor_1.Conversor(this.origem, this.destino, this.valor);
            const canConvert = this.canConvert(conversor);
            if (canConvert.status === operationCodes_1.OperationStatus.FAILURE) {
                return { status: canConvert.status, error: canConvert.error };
            }
            let resultado = yield conversor.converter();
            let taxa = conversor.getTaxa();
            // pega os resulstados arredondados da função roundvalues
            const { resultado: roundedResult, taxa: roundedTaxa } = this.roundValues(resultado, taxa);
            resultado = roundedResult;
            taxa = roundedTaxa;
            this.setTaxa(taxa);
            return resultado;
        });
    }
}
exports.ConversorController = ConversorController;
