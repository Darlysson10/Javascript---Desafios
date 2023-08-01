"use strict";
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
        const conversor = new Conversor_1.Conversor(this.origem, this.destino, this.valor);
        conversor.converter();
        return conversor.calcularConversao();
    }
}
exports.ConversorController = ConversorController;
