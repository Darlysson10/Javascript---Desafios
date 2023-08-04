"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationStatus = exports.OperationErrors = void 0;
/**
 * Classe com os códigos de SUCESSO e FALHA de uma operação
 * no controller
 */
class OperationStatus {
    static get SUCCESS() {
        return 1;
    }
    static get FAILURE() {
        return 2;
    }
}
exports.OperationStatus = OperationStatus;
/**
 * Classe com todos os códigos de erro das operações
 */
class OperationErrors {
    static get INVALID_CURRENCY() {
        return 1;
    }
    static get INVALID_VALUE() {
        return 2;
    }
    static get INVALID_CURRENCY_SIZE() {
        return 3;
    }
    static get INVALID_CURRENCY_PAIR() {
        return 4;
    }
}
exports.OperationErrors = OperationErrors;
