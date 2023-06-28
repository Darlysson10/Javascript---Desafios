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

class Triangulo {
        
    constructor(vertice1, vertice2, vertice3) {
        this._vertices = [vertice1, vertice2, vertice3];
        this.validade();
    }
     

    t_equals(triangulo){
        return this._vertices[0].equals(triangulo._vertices[0]) && this._vertices[1].equals(triangulo._vertices[1]) && this._vertices[2].equals(triangulo._vertices[2]);
    }

    lado(){
        const lado1 = this._vertices[0].distancia(this._vertices[1]);
        const lado2 = this._vertices[1].distancia(this._vertices[2]);
        const lado3 = this._vertices[2].distancia(this._vertices[0]);
        return [lado1, lado2, lado3];
    }

    perimeter() {
        const lados = this.lado();
        return lados[0] + lados[1] + lados[2];
    }

    tipo() {
        const lados = this.lado();
        if (lados[0] === lados[1] && lados[1] === lados[2]) {
            return 'equilátero';
        }
        if (lados[0] === lados[1] || lados[1] === lados[2] || lados[2] === lados[0]) {
            return 'isósceles';
        }
        return 'escaleno';

    }

    area() {
        const lados = this.lado();
        const S = this.perimeter() / 2;
        const area_triangulo = Math.sqrt(S * (S - lados[0]) * (S - lados[1]) * (S - lados[2]));
        return area_triangulo;
    }

    clone(triangulo){
        return new Triangulo(triangulo._vertices[0], triangulo._vertices[1], triangulo._vertices[2]);
    }

    validade(){
        const lados = this.lado();
        const S = this.perimeter() / 2;
    

        if (this._vertices[0].equals(this._vertices[1]) || this._vertices[0].equals(this._vertices[2]) || this._vertices[1].equals(this._vertices[2])) {
            throw new Error('Os vértices devem ser diferentes');
        }
        else if (lados[0] + lados[1] <= lados[2] || lados[1] + lados[2] <= lados[0] || lados[2] + lados[0] <= lados[1]) {
            throw new Error('Não é um triângulo válido pela desigualdade triangular');
        }
        else if (lados[0] <= 0 || lados[1] <= 0 || lados[2] <= 0) {
            throw new Error('Não é um triângulo válido pois um dos lados é menor ou igual a zero');
        }

    }

}

const prompt = require('prompt-sync')({ sigint: true });


console.log("Triângulo 1:")
let triangulo1 =  new Triangulo(new Vertice(prompt('Digite o valor de x do vértice 1: '), prompt('Digite o valor de y do vértice 1: ')), new Vertice(prompt('Digite o valor de x do vértice 2: '), prompt('Digite o valor de y do vértice 2: ')), new Vertice(prompt('Digite o valor de x do vértice 3: '), prompt('Digite o valor de y do vértice 3: ')));

console.log("Triângulo 2:")
let triangulo2 =  new Triangulo(new Vertice(prompt('Digite o valor de x do vértice 1: '), prompt('Digite o valor de y do vértice 1: ')), new Vertice(prompt('Digite o valor de x do vértice 2: '), prompt('Digite o valor de y do vértice 2: ')), new Vertice(prompt('Digite o valor de x do vértice 3: '), prompt('Digite o valor de y do vértice 3: ')));

console.log("Triângulo 3:")
let triangulo3 =  new Triangulo(new Vertice(prompt('Digite o valor de x do vértice 1: '), prompt('Digite o valor de y do vértice 1: ')), new Vertice(prompt('Digite o valor de x do vértice 2: '), prompt('Digite o valor de y do vértice 2: ')), new Vertice(prompt('Digite o valor de x do vértice 3: '), prompt('Digite o valor de y do vértice 3: ')));

console.log("Comparando os triângulos:")
console.log(`Triângulo 1 e Triângulo 2 são iguais? ${triangulo1.t_equals(triangulo2)}`);
console.log(`Triângulo 1 e Triângulo 3 são iguais? ${triangulo1.t_equals(triangulo3)}`);
console.log(`Triângulo 2 e Triângulo 3 são iguais? ${triangulo2.t_equals(triangulo3)}`);

console.log("Calculando o perímetro dos triângulos:")
console.log(`O perímetro do Triângulo 1 é ${triangulo1.perimeter()}`);
console.log(`O perímetro do Triângulo 2 é ${triangulo2.perimeter()}`);
console.log(`O perímetro do Triângulo 3 é ${triangulo3.perimeter()}`);

console.log("Calculando o tipo dos triângulos:")
console.log(`O tipo do Triângulo 1 é ${triangulo1.tipo()}`);
console.log(`O tipo do Triângulo 2 é ${triangulo2.tipo()}`);
console.log(`O tipo do Triângulo 3 é ${triangulo3.tipo()}`);

console.log("Calculando a área dos triângulos:")
console.log(`A área do Triângulo 1 é ${triangulo1.area()}`);
console.log(`A área do Triângulo 2 é ${triangulo2.area()}`);
console.log(`A área do Triângulo 3 é ${triangulo3.area()}`);

console.log("Criando um 4° trângulo como clone do triângulo 1");
let triangulo4 = triangulo1.clone(triangulo1);
console.log("Comparando o triângulo 4 com o triângulo 1:")
console.log(`Triângulo 1 e Triângulo 4 são iguais? ${triangulo1.t_equals(triangulo4)}`);
