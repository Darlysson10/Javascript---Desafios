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
 * @param {APIService} apiService - O serviço de comunicação com a API externa.
 * @param {number} taxa - A taxa de conversão.
 * @param {number} valorConvertido - O valor convertido.
 */
    constructor(moedaOrigem, moedaDestino, valor) {
        this.moedaOrigem = moedaOrigem;
        this.moedaDestino = moedaDestino;
        this.valor = valor;
        this.taxa = 0;
        this.valorConvertido = 0;
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
     * Obtém a moeda de destino para fazer a conversão.
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
    /**
     * Define a taxa de conversão.
     * @param {number} taxa - A taxa de conversão.
     * @returns {void}
     */
    setTaxa(taxa) {
        this.taxa = taxa;
    }
    /**
     * Obtém o valor convertido.
     * @params {number} valorConvertido - O valor convertido.
     */
    setValorConvertido(valorConvertido) {
        this.valorConvertido = valorConvertido;
    }
    /**
     * Obtém o valor convertido.
     * @returns {number} O valor convertido.
     */
    getValorConvertido() {
        return this.valorConvertido;
    }
    /**
     * Obtém a taxa de conversão.
     * @returns {number} A taxa de conversão.
     */
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
    /**
     * Verifica se as moedas de origem e destino são iguais.
     * @returns {boolean} True se as moedas são iguais, False caso contrário.
     */
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
    roundValues(valorConvertido, taxa) {
        // Arredondar o resultado para 2 casas decimais
        valorConvertido = Math.round(valorConvertido * 100) / 100;
        // arredondar a taxa para 6 casas decimais
        taxa = Math.round(taxa * 1000000) / 1000000;
        return { valorConvertido, taxa };
    }
    /**
 * Realiza a conversão de moedas utilizando a API externa.
 * @returns {Promise<number>} Uma promise contendo o valor convertido.
 */
    converter() {
        return __awaiter(this, void 0, void 0, function* () {
            const { result, taxa } = yield this.apiService.getAPIdata(this.moedaOrigem, this.moedaDestino, this.valor);
            const { valorConvertido, taxa: taxaArredondada } = this.roundValues(result, taxa);
            this.setTaxa(taxaArredondada);
            this.setValorConvertido(valorConvertido);
        });
    }
}
exports.Conversor = Conversor;
