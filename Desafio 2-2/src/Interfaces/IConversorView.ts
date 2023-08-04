export interface IConversorView {
    getInputs(): any;
    showErrors(status: number, error: number): void;
    showResult(result: number, taxa: number, moedaDestino: string): void;
    
}