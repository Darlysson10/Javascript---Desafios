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
exports.APIServiceController = void 0;
const fetch = require('node-fetch');
const { Response } = require('node-fetch');
class APIServiceController {
    getJsonData(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield response.json();
            if (this.isConversionData(data)) {
                return data;
            }
            else {
                throw new Error('Dados de conversão inválidos');
            }
        });
    }
    isConversionData(data) {
        var _a;
        return typeof ((_a = data.info) === null || _a === void 0 ? void 0 : _a.rate) === 'number';
    }
    getConversionData(moedaOrigem, moedaDestino, valor) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
            const response = yield fetch(url);
            return this.getJsonData(response);
        });
    }
}
exports.APIServiceController = APIServiceController;
