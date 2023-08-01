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
  
    private setTaxa(taxa: number): void {
      this.taxa = taxa;
    }

    public async converter(): Promise<void> {
      try {
        const data = await this.apiService.getConversionData(
          this.moedaOrigem,
          this.moedaDestino,
          this.valor
        );
  
        this.setTaxa(data.info.rate);
      } catch (error) {
        throw new Error('Erro ao converter moedas'); // TODO: criar uma classe erros, o throw irá apenas retornar um código erro que está definido na classe erros
      }
    }
  
    public calcularConversao(): number {
      return this.valor * this.taxa;
    }
}
