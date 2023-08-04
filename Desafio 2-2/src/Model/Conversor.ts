import { APIService } from './APIService';
import { ConversorInterface } from '../Interfaces/IConversor';
import { JsonCurrencyLoader } from '../Utils/JsonCurrencyloader';

/**
 * Classe responsável pela realização da conversão de moedas utilizando uma API externa.
 * Implementa a interface ConversorInterface.
 */
export class Conversor implements ConversorInterface {
    private moedaOrigem: string;
    private moedaDestino: string;
    private valor: number;
    private taxa: number;
    private apiService: APIService;
    private valorConvertido: number;
    

        /**
     * Construtor da classe Conversor.
     * @param {string} moedaOrigem - A moeda de origem para a conversão.
     * @param {string} moedaDestino - A moeda de destino para a conversão.
     * @param {number} valor - O valor a ser convertido.
     * @param {APIService} apiService - O serviço de comunicação com a API externa.
     * @param {number} taxa - A taxa de conversão.
     * @param {number} valorConvertido - O valor convertido.
     */

    constructor(moedaOrigem: string, moedaDestino: string, valor: number) {
      this.moedaOrigem = moedaOrigem;
      this.moedaDestino = moedaDestino;
      this.valor = valor;
      this.taxa = 0;
      this.valorConvertido = 0;
      this.apiService = new APIService();

    }
     /**
     * Obtém a moeda de origem para a conversão.
     * @returns {string} A moeda de origem.
     */

    public getMoedaOrigem(): string {
      return this.moedaOrigem;
    }
    
    /**
     * Obtém a moeda de destino para fazer a conversão.
     * @returns {string} A moeda de destino.
     */

    public getMoedaDestino(): string {
      return this.moedaDestino;
    }
    
    /**
     * Obtém o valor a ser convertido.
     * @returns {number} O valor a ser convertido.
     */

    public getValor(): number {
      return this.valor;
    }

    private setTaxa(taxa: number): void {
      this.taxa = taxa;
    }

    private setValorConvertido(valorConvertido: number): void {
      this.valorConvertido = valorConvertido;
    }

    public getValorConvertido(): number {
      return this.valorConvertido;
    }

    public getTaxa(): number {
      return this.taxa;
    }
        /**
     * Verifica se as moedas de origem e destino são válidas. Utiliza o arquivo Currencies.json para verificar.
     * @returns {boolean} True se as moedas são válidas, False caso contrário.
     */

    public isValidCurrency(): boolean {
      
      const jsonCurrencyLoader = new JsonCurrencyLoader();
      const currencies = jsonCurrencyLoader.getCurrencies();
      return currencies[this.moedaDestino] !== undefined && currencies[this.moedaOrigem] !== undefined;
    
    }

    public moedasIguais(): boolean {
      return this.moedaOrigem === this.moedaDestino;
    }

    public isValidCurrencySize(): boolean {
      return this.moedaOrigem.length === 3 && this.moedaDestino.length === 3;
    }

    /**
     * Verifica se o valor é válido (maior que  zero).
     * @returns {boolean} True se o valor é válido, False caso contrário.
     */
    public isValidValue(): boolean {
      return this.valor > 0;
    }
    
    private roundValues(valorConvertido: number, taxa: number): {valorConvertido: number, taxa: number} {
        // Arredondar o resultado para 2 casas decimais
        valorConvertido = Math.round(valorConvertido * 100) / 100;
        // arredondar a taxa para 6 casas decimais
        taxa = Math.round(taxa * 1000000) / 1000000;
        return {valorConvertido, taxa};
     }
        /**
     * Realiza a conversão de moedas utilizando a API externa.
     * @returns {Promise<number>} Uma promise contendo o valor convertido.
     */
    public async converter(): Promise<void> {
      const {result, taxa} = await this.apiService.getAPIdata(
        this.moedaOrigem,
        this.moedaDestino,
        this.valor
      );
      const {valorConvertido, taxa: taxaArredondada} = this.roundValues(result, taxa);
      this.setTaxa(taxaArredondada);
      this.setValorConvertido(valorConvertido);
      
    }
  
}
