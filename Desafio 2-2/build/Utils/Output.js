"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
class Output {
    write(message) {
        process.stdout.write(message);
    }
    writeLine(message) {
        console.log(message);
    }
}
exports.Output = Output;
