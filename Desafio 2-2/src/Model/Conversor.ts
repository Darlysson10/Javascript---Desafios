import { APIServiceController } from '../Controller/APIServiceController';
import { ConversorInterface } from '../Interfaces/IConversor';
export class Conversor implements ConversorInterface {
    private moedaOrigem: string;
    private moedaDestino: string;
    private valor: number;
    private taxa: number;
    private apiService: APIServiceController;
  
    constructor(moedaOrigem: string, moedaDestino: string, valor: number) {
      this.moedaOrigem = moedaOrigem;
      this.moedaDestino = moedaDestino;
      this.valor = valor;
      this.taxa = 0;
      this.apiService = new APIServiceController();
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
  
    public getTaxa(): number {
      return this.taxa;
    }
  

    public async converter(): Promise<number> {
      try {
        const data = await this.apiService.getAPIdata(
          this.moedaOrigem,
          this.moedaDestino,
          this.valor
        );
        return data;
      } catch (error) {
        throw new Error('Erro ao converter moedas'); // TODO: criar uma classe erros, o throw irá apenas retornar um código erro que está definido na classe erros
      }
    }
  
}
