export interface APIServiceInterface {
    getAPIdata(moedaOrigem: string, moedaDestino: string, valor: number): Promise<{result: number, taxa: number}>;
}