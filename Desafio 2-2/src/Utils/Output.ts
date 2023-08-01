export class Output{

    write(message: string){
        process.stdout.write(message);
    }

    writeLine(message: string){
        console.log(message);
    }
}