export interface IConversorView {
    getInputs(): any;
    showErrors(status: number, error: number): void;
    showResult(result: number, moedaDestino: string): void;
    
}