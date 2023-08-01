"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const Output_1 = require("./Output");
class Input {
    constructor() {
        this.output = new Output_1.Output();
        this.readline = require('readline-sync');
    }
    readLine(message) {
        return this.readline.question(message);
    }
    readNumber(message) {
        const input = this.readLine(message);
        return Number(input);
    }
}
exports.Input = Input;
