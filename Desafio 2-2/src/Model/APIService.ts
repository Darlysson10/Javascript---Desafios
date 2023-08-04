import { APIServiceInterface } from "../Interfaces/IAPIService";
import axios from 'axios';
/**
 * Classe responsável por se comunicar com a API de conversão de moedas.
 * Implementa a interface APIServiceInterface.
 */
export class APIService implements APIServiceInterface {
    
       /**
     * Obtém os dados da API de conversão de moedas.
     * @param {string} moedaOrigem - A moeda de origem para a conversão.
     * @param {string} moedaDestino - A moeda de destino para a conversão.
     * @param {number} valor - O valor a ser convertido.
     * @returns {Promise<number>} Uma promise com o resultado da conversão.
     * @throws {Error} Lança um erro caso haja falha na comunicação com a API.
     */

       
    public async getAPIdata(moedaOrigem: string, moedaDestino: string, valor: number): Promise<{result: number, taxa: number}> {
        const url: string = `https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
        try {
            const response = await axios.get(url);
            const { result } = response.data;
            const taxa = response.data.info.rate;
            return { result, taxa };
          } catch (error) {
            throw new Error('Erro na comunicação com a API'); 
          }
    }
}
