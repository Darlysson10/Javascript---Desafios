class Cliente {
    constructor(nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.rendaMensal = rendaMensal;
        this.estadoCivil = estadoCivil;
        this.dependentes = dependentes;

    }
    imprimirDados() {
        console.log(`Nome: ${this.nome}`);
        console.log(`CPF: ${this.cpf.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}`);
        console.log(`Data de nascimento: ${this.dataNascimento.toLocaleDateString('pt-BR')}`);
        console.log(`Renda mensal: R$ ${this.rendaMensal.toFixed(2).replace('.', ',')}`);
        console.log(`Estado civil: ${this.estadoCivil}`);
        console.log(`Dependentes: ${this.dependentes}`);
        
    }
}

function NomeInvalido(nome){
    if (typeof nome !== 'string' || nome.length < 5) {
        console.log('Nome inválido, tente novamente');
        return true
    }

}

function CpfInvalido(cpf){
    if (isNaN(cpf)|| cpf.toString().length !== 11) {
        console.log('CPF inválido, tente novamente');
        return true
    }
}

function DataNascimentoInvalida(dataNascimento){
    
    dataNascimento = new Date(dataNascimento.split('/').reverse().join('-'));
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!regex.test(dataNascimento.toLocaleDateString('pt-BR')) || isNaN(dataNascimento.getDate()) || isNaN(dataNascimento.getMonth()) || isNaN(dataNascimento.getFullYear()) || dataNascimento.getFullYear() > new Date().getFullYear() - 18 || dataNascimento.getDate() === 0 || dataNascimento.getMonth() === 0 || dataNascimento.getFullYear() === 0) {
        console.log('Data de nascimento inválida, tente novamente');
        return true
    }
}

function RendaMensalInvalida(rendaMensal){
    if (isNaN(rendaMensal) || rendaMensal <= 0) {
        console.log('Renda mensal inválida, tente novamente');
        return true
    }
}

function EstadoCivilInvalido(estadoCivil){
    if (typeof estadoCivil !== 'string' || !['s', 'c', 'v', 'd'].includes(estadoCivil.toLowerCase())) {
        console.log('Estado civil inválido, tente novamente');
        return true
    }
}

function DependentesInvalido(dependentes){
    if (isNaN(dependentes) || dependentes < 0 || dependentes > 10) {
        console.log('Número de dependentes inválido, tente novamente');
        return true
    }
}

function Entrada(mensagem, validacao){
    let entrada = prompt(mensagem);
    while (validacao(entrada)) {
        entrada = prompt(mensagem);
    }
    return entrada
}



const prompt = require('prompt-sync')({ sigint: true });

let nome = Entrada('Nome: ', NomeInvalido);
let cpf = Entrada('CPF: ', CpfInvalido);
let dataNascimento = Entrada('Data de nascimento: ', DataNascimentoInvalida);
dataNascimento = new Date(dataNascimento.split('/').reverse().join('-'));
dataNascimento.setDate(dataNascimento.getDate() + 1) // Ajuste de fuso horário
let rendaMensal = Entrada('Renda mensal: ', RendaMensalInvalida);
let estadoCivil = Entrada('Estado civil: ', EstadoCivilInvalido);
let dependentes = Entrada('Número de dependentes: ', DependentesInvalido);

let cliente = new Cliente(nome, cpf, new Date(dataNascimento), parseFloat(rendaMensal), estadoCivil, parseInt(dependentes));

cliente.imprimirDados();
