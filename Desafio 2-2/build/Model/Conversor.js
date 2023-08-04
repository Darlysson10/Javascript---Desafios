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
exports.Conversor = void 0;
const APIService_1 = require("./APIService");
const JsonCurrencyloader_1 = require("../Utils/JsonCurrencyloader");
/**
 * Classe responsável pela realização da conversão de moedas utilizando uma API externa.
 * Implementa a interface ConversorInterface.
 */
class Conversor {
    /**
 * Construtor da classe Conversor.
 * @param {string} moedaOrigem - A moeda de origem para a conversão.
 * @param {string} moedaDestino - A moeda de destino para a conversão.
 * @param {number} valor - O valor a ser convertido.
 */
    constructor(moedaOrigem, moedaDestino, valor) {
        this.moedaOrigem = moedaOrigem;
        this.moedaDestino = moedaDestino;
        this.valor = valor;
        this.taxa = 0;
        this.apiService = new APIService_1.APIService();
    }
    /**
    * Obtém a moeda de origem para a conversão.
    * @returns {string} A moeda de origem.
    */
    getMoedaOrigem() {
        return this.moedaOrigem;
    }
    /**
     * Obtém a moeda de destino para a conversão.
     * @returns {string} A moeda de destino.
     */
    getMoedaDestino() {
        return this.moedaDestino;
    }
    /**
     * Obtém o valor a ser convertido.
     * @returns {number} O valor a ser convertido.
     */
    getValor() {
        return this.valor;
    }
    setTaxa(taxa) {
        this.taxa = taxa;
    }
    getTaxa() {
        return this.taxa;
    }
    /**
 * Verifica se as moedas de origem e destino são válidas. Utiliza o arquivo Currencies.json para verificar.
 * @returns {boolean} True se as moedas são válidas, False caso contrário.
 */
    isValidCurrency() {
        const jsonCurrencyLoader = new JsonCurrencyloader_1.JsonCurrencyLoader();
        const currencies = jsonCurrencyLoader.getCurrencies();
        return currencies[this.moedaDestino] !== undefined && currencies[this.moedaOrigem] !== undefined;
    }
    moedasIguais() {
        return this.moedaOrigem === this.moedaDestino;
    }
    isValidCurrencySize() {
        return this.moedaOrigem.length === 3 && this.moedaDestino.length === 3;
    }
    /**
     * Verifica se o valor é válido (maior que  zero).
     * @returns {boolean} True se o valor é válido, False caso contrário.
     */
    isValidValue() {
        return this.valor > 0;
    }
    /**
 * Realiza a conversão de moedas utilizando a API externa.
 * @returns {Promise<number>} Uma promise contendo o valor convertido.
 */
    converter() {
        return __awaiter(this, void 0, void 0, function* () {
            const { result, taxa } = yield this.apiService.getAPIdata(this.moedaOrigem, this.moedaDestino, this.valor);
            this.setTaxa(taxa);
            return result;
        });
    }
}
exports.Conversor = Conversor;
