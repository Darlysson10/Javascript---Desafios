import { Output } from "./Output";

export class Input{
    private output: Output;
    private readline: any;

    constructor(){
        this.output = new Output();
        this.readline = require('readline-sync');
    }

    public readLine(message: string): string{
        return this.readline.question(message);
    }

    public readNumber(message: string): number{
        const input: string = this.readLine(message);
        return Number(input);
    }
}
