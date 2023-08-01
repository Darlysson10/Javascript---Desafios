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
const APIServiceController_1 = require("../Controller/APIServiceController");
class Conversor {
    constructor(moedaOrigem, moedaDestino, valor) {
        this.moedaOrigem = moedaOrigem;
        this.moedaDestino = moedaDestino;
        this.valor = valor;
        this.taxa = 0;
        this.apiService = new APIServiceController_1.APIServiceController();
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
    getTaxa() {
        return this.taxa;
    }
    setTaxa(taxa) {
        this.taxa = taxa;
    }
    converter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.apiService.getConversionData(this.moedaOrigem, this.moedaDestino, this.valor);
                this.setTaxa(data.info.rate);
            }
            catch (error) {
                throw new Error('Erro ao converter moedas'); // TODO: criar uma classe erros, o throw irá apenas retornar um código erro que está definido na classe erros
            }
        });
    }
    calcularConversao() {
        return this.valor * this.taxa;
    }
}
exports.Conversor = Conversor;
