import * as fs from 'fs';
import { JsonCurrencyLoaderInterface } from '../Interfaces/IJsonCurrencyloader'
export class JsonCurrencyLoader implements JsonCurrencyLoaderInterface {
    private currencies: any;

    constructor() {
        const file =  fs.readFileSync('./src/Utils/Currencies.json', 'utf8');
        this.currencies = JSON.parse(file);
    }

    public getCurrencies(): any {
        return this.currencies;
    }
}