export interface ConversorInterface {
    getMoedaOrigem(): string;
    getMoedaDestino(): string;
    getValor(): number;
    converter(): Promise<number>;
  }