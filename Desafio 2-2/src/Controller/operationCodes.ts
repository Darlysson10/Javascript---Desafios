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
}

export { OperationErrors, OperationStatus };
