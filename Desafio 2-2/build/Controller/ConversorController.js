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
class ConversorController {
    constructor(origem, destino, valor) {
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
    }
    converter() {
        return __awaiter(this, void 0, void 0, function* () {
            const conversor = new Conversor_1.Conversor(this.origem, this.destino, this.valor);
            const resultado = yield conversor.converter();
            return resultado;
        });
    }
}
exports.ConversorController = ConversorController;
