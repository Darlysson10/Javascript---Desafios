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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIService = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Classe responsável por se comunicar com a API de conversão de moedas.
 * Implementa a interface APIServiceInterface.
 */
class APIService {
    /**
  * Obtém os dados da API de conversão de moedas.
  * @param {string} moedaOrigem - A moeda de origem para a conversão.
  * @param {string} moedaDestino - A moeda de destino para a conversão.
  * @param {number} valor - O valor a ser convertido.
  * @returns {Promise<number>} Uma promise com o resultado da conversão.
  * @throws {Error} Lança um erro caso haja falha na comunicação com a API.
  */
    getAPIdata(moedaOrigem, moedaDestino, valor) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
            try {
                const response = yield axios_1.default.get(url);
                const { result } = response.data;
                const taxa = response.data.info.rate;
                return { result, taxa };
            }
            catch (error) {
                throw new Error('Erro na comunicação com a API');
            }
        });
    }
}
exports.APIService = APIService;
