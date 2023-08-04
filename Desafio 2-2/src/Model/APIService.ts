import { APIServiceInterface } from "../Interfaces/IAPIService";
import axios from 'axios';

export class APIService implements APIServiceInterface {
    public async getAPIdata(moedaOrigem: string, moedaDestino: string, valor: number): Promise<number> {
        const url: string = `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
        try {
            const response = await axios.get(url);
            const { result } = response.data;
            return result;
          } catch (error) {
            throw new Error('Erro na comunicação com a API'); 
          }
    }
}
