import { ConversionData } from "../Interfaces/ConversionData";
import fetch, { Response } from 'node-fetch'; // Essa importação não está funcionando. TODO: verificar como importar o node-fetch
import { APIServiceInterface } from "../Interfaces/IAPIService";

export class APIServiceController implements APIServiceInterface  {
  
    private async getJsonData(response: Response): Promise<any> {
        const data = await response.json();
        if (this.isConversionData(data)) {
            return data;
        } else {
                throw new Error('Dados de conversão inválidos');
            }
    }

    private isConversionData(data: any): data is ConversionData {
        return typeof data.info?.rate === 'number';
    }

    public async getConversionData(
        moedaOrigem: string,
        moedaDestino: string,
        valor: number
        ): Promise<ConversionData> {
            const url = `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
            const response = await fetch(url);
            return this.getJsonData(response);
        }
}