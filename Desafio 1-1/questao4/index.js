class Aluno {
    constructor(nome, matricula) {
        this.nome = nome;
        this.matricula = matricula;
        this.p1 = 0.0;
        this.p2 = 0.0;
    }
}

class Turma {
    constructor(nome) {
        this.nome = nome;
        this.alunos = [];
    }

    add_aluno(aluno) {
        if (this.alunos.find(x => x.matricula === aluno.matricula)) {
            console.log("Aluno já cadastrado");
            return;
        }
        this.alunos.push(aluno);
    }

    lancar_notas(matricula_aluno, p1, p2) {
        if (p1 < 0 || p1 > 10 || p2 < 0 || p2 > 10) {
            console.log("Nota inválida");
            return;
        }
        let aluno = this.alunos.find(x => x.matricula === matricula_aluno);
        aluno.p1 = p1;
        aluno.p2 = p2;
    }




    remover_aluno(matricula) {
        let index = this.alunos.findIndex(x => x.matricula === matricula);
        if (index === -1) {
            console.log("Aluno não encontrado");
            return;
        }
        this.alunos.splice(index, 1); 
    }


    imprimir_alunos() {
        this.alunos.sort((a, b) => a.nome.localeCompare(b.nome));
        console.log("-------------------------------------------------------------------");
        console.log("Matricula".padEnd(10), "Nome".padEnd(20), "P1".padEnd(5), "P2".padEnd(5), "NF".padEnd(5));
        console.log("-------------------------------------------------------------------");
        this.alunos.forEach(aluno => {
            let nf = (aluno.p1 + aluno.p2) / 2;
            if (aluno.p1 === 0) {
                aluno.p1 = "-";
            }
            if (aluno.p2 === 0) {
                aluno.p2 = "-";
            }
            console.log(
                aluno.matricula.toString().padEnd(10),
                aluno.nome.padEnd(20),
                aluno.p1.toString().padEnd(5),
                aluno.p2.toString().padEnd(5),
                nf.toString().padEnd(5)
            );
        });
        console.log("-------------------------------------------------------------------");
    }
    
}

const prompt = require('prompt-sync')({ sigint: true });
let turma = new Turma("Turma 1");
console.log("Insira os nomes e matriculas dos alunos da turma");
console.log("Para finalizar a inserção, digite -1 no campo 'nome'");
let nome = "";
let matricula = 0;
while (nome !== "-1") {
    nome = prompt("Insira o nome do aluno: ");
    if (nome === "-1") {
        break;
    }
    matricula = prompt("Insira a matricula do aluno: ");
    let aluno = new Aluno(nome, matricula);
    turma.add_aluno(aluno);
}



console.log("Insira as notas dos alunos");
console.log("Para finalizar a inserção, digite -1 no campo 'matricula'");
let matricula_aluno = 0;
let p1 = 0;
let p2 = 0;
while (matricula_aluno !== "-1") {
    matricula_aluno = prompt("Insira a matricula do aluno: ");
    if (matricula_aluno === "-1") {
        break;
    }
    p1 = parseFloat(prompt("Insira a nota da P1: "));
    p2 = parseFloat(prompt("Insira a nota da P2: "));
    turma.lancar_notas(matricula_aluno, p1, p2);

}
turma.imprimir_alunos();



