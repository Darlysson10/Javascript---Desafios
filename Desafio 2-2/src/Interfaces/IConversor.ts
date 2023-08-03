export interface ConversorInterface {
    getMoedaOrigem(): string;
    getMoedaDestino(): string;
    getValor(): number;
    getTaxa(): number;
    converter(): Promise<number>;
  }