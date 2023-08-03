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
exports.ConversorView = void 0;
const Input_1 = require("../Utils/Input");
const Output_1 = require("../Utils/Output");
const ConversorController_1 = require("../Controller/ConversorController");
class ConversorView {
    constructor() {
        this.input = new Input_1.Input();
        this.output = new Output_1.Output();
    }
    showMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            for (;;) {
                this.output.writeLine("Bem vindo ao conversor de moedas");
                this.output.writeLine("Digite a moeda de origem, a moeda de destino e o valor a ser convertido");
                this.output.writeLine("Exemplo: USD BRL 100");
                this.output.writeLine("Digite 'sair' para sair do programa");
                const moedaOrigem = this.input.readLine("Digite a moeda de origem: ");
                if (moedaOrigem === "sair") {
                    break;
                }
                const moedaDestino = this.input.readLine("Digite a moeda de destino: ");
                if (moedaDestino === "sair") {
                    break;
                }
                //TODO: Validação de moedas
                const valor = this.input.readNumber("Digite o valor a ser convertido: ");
                const conversorController = new ConversorController_1.ConversorController(moedaOrigem, moedaDestino, valor);
                const resultado = yield conversorController.converter();
                this.output.writeLine(`O valor convertido é: ${resultado}`);
            }
        });
    }
}
exports.ConversorView = ConversorView;
