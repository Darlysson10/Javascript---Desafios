class Vertice {
    
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    distancia(vertice) {
        const dx = this._x - vertice._x;
        const dy = this._y - vertice._y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    move(x, y) {
        this._x = x;
        this._y = y;
    }

    equals(vertice) {
        return this._x === vertice._x && this._y === vertice._y;
    }
}

const prompt = require('prompt-sync')({ sigint: true });

let vertice1 = prompt('Digite o valor de x e y do vértice 1: ').split(' ');
let vertice2 = prompt('Digite o valor de x e y do vértice 2: ').split(' ');
let vertice3 = prompt('Digite o valor de x e y do vértice 3: ').split(' ');

vertice1 = new Vertice(vertice1[0], vertice1[1]);
vertice2 = new Vertice(vertice2[0], vertice2[1]);
vertice3 = new Vertice(vertice3[0], vertice3[1]);

switch (prompt('Digite 1 para calcular a distância entre os vértices 1 e 2, 2 para calcular a distância entre os vértices 2 e 3 e 3 para calcular a distância entre os vértices 1 e 3: ')) {
    case '1':
        console.log(`A distância entre o vértices 1 e 2 é ${vertice1.distancia(vertice2)}`);
        break;
    case '2':
        console.log(`A distância entre o vértices 2 e 3 é ${vertice2.distancia(vertice3)}`);
        break;
    case '3':
        console.log(`A distância entre o vértices 1 e 3 é ${vertice1.distancia(vertice3)}`);
        break;
    default:
        console.log('Opção inválida');
        break;
}



switch (prompt('Digite 1 para mover o vértice 1, 2 para mover o vértice 2 e 3 para mover o vértice 3: ')) {
    case '1':
        vertice1.move(prompt('Digite o valor de x e y do vértice 1: ').split(' '));
        break;
    case '2':
        vertice2.move(prompt('Digite o valor de x e y do vértice 2: ').split(' '));
        break;
    case '3':
        vertice3.move(prompt('Digite o valor de x e y do vértice 3: ').split(' '));
        break;
    default:
        console.log('Opção inválida');
        break;
}

switch (prompt('Digite 1 para verificar se o vértice 1 é igual ao vértice 2, 2 para verificar se o vértice 2 é igual ao vértice 3 e 3 para verificar se o vértice 1 é igual ao vértice 3: ')) {
    case '1':
        console.log(`O vértice 1 é igual ao vértice 2? ${vertice1.equals(vertice2)}`);
        break;
    case '2':
        console.log(`O vértice 2 é igual ao vértice 3? ${vertice2.equals(vertice3)}`);
        break;
    case '3':
        console.log(`O vértice 1 é igual ao vértice 3? ${vertice1.equals(vertice3)}`);
        break;
    default:
        console.log('Opção inválida');
        break;
}
