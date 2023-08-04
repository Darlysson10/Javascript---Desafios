export interface ConversorInterface {
    getMoedaOrigem(): string;
    getMoedaDestino(): string;
    getValor(): number;
    getTaxa(): number;
    isValidCurrency(): boolean;
    isValidValue(): boolean;
    isValidCurrencySize(): boolean;
    moedasIguais(): boolean;
    converter(): Promise<void>;
  }