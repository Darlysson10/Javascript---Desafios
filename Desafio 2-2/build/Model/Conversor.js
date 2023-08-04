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
class Conversor {
    constructor(moedaOrigem, moedaDestino, valor) {
        this.moedaOrigem = moedaOrigem;
        this.moedaDestino = moedaDestino;
        this.valor = valor;
        this.apiService = new APIService_1.APIService();
    }
    getMoedaOrigem() {
        return this.moedaOrigem;
    }
    getMoedaDestino() {
        return this.moedaDestino;
    }
    getValor() {
        return this.valor;
    }
    isValidCurrency() {
        const jsonCurrencyLoader = new JsonCurrencyloader_1.JsonCurrencyLoader();
        const currencies = jsonCurrencyLoader.getCurrencies();
        return currencies[this.moedaDestino] !== undefined && currencies[this.moedaOrigem] !== undefined;
    }
    isValidValue() {
        return this.valor >= 0;
    }
    // Colocar funções de validação aqui
    converter() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiService.getAPIdata(this.moedaOrigem, this.moedaDestino, this.valor);
            return data;
        });
    }
}
exports.Conversor = Conversor;
