
export interface APIServiceInterface {
    getAPIdata(moedaOrigem: string, moedaDestino: string, valor: number): Promise<number>;
}