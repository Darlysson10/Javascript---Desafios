import { APIService } from './APIService';
import { ConversorInterface } from '../Interfaces/IConversor';
import { JsonCurrencyLoader } from '../Utils/JsonCurrencyloader';
export class Conversor implements ConversorInterface {
    private moedaOrigem: string;
    private moedaDestino: string;
    private valor: number;
    private apiService: APIService;
  
    constructor(moedaOrigem: string, moedaDestino: string, valor: number) {
      this.moedaOrigem = moedaOrigem;
      this.moedaDestino = moedaDestino;
      this.valor = valor;
      this.apiService = new APIService();
    }
  
    public getMoedaOrigem(): string {
      return this.moedaOrigem;
    }
  
    public getMoedaDestino(): string {
      return this.moedaDestino;
    }
  
    public getValor(): number {
      return this.valor;
    }

    public isValidCurrency(): boolean {
      
      const jsonCurrencyLoader = new JsonCurrencyLoader();
      const currencies = jsonCurrencyLoader.getCurrencies();
      return currencies[this.moedaDestino] !== undefined && currencies[this.moedaOrigem] !== undefined;
    
    }

    public isValidValue(): boolean {
      return this.valor >= 0;
    }
    
    // Colocar funções de validação aqui
  

    public async converter(): Promise<number> {
      const data = await this.apiService.getAPIdata(
        this.moedaOrigem,
        this.moedaDestino,
        this.valor
      );
      return data;
      
    }
  
}
