import { ConversionData } from "../Interfaces/ConversionData";
export interface APIServiceInterface {
    getConversionData(moedaOrigem: string, moedaDestino: string, valor: number): Promise<ConversionData>;
}