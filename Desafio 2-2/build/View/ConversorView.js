"use strict";
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
            const resultado = conversorController.converter();
            this.output.writeLine(`O valor convertido é: ${resultado}`);
        }
    }
}
exports.ConversorView = ConversorView;
