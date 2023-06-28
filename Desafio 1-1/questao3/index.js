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

class Poligono {

    constructor (vertices){
        this._vertices = vertices;
        this.validation();

    }

    validation(){
        if (this._vertices.length < 3){
            throw new Error('Poligono deve ter no mínimo 3 vértices');
        }

    }

    addVertice(vertice){
        for (let i = 0; i < this._vertices.length; i++){
            if (this._vertices[i].equals(vertice)){
                return false; 
            }
        }
        this._vertices.push(vertice);
        return true;
    }

    perimeter(){
        let perimetro = 0;
        for (let i = 0; i < this._vertices.length; i++){
            perimetro += this._vertices[i].distancia(this._vertices[(i + 1) % this._vertices.length]); // (i + 1) % this._vertices.length -> para que o último vértice seja ligado ao primeiro
        }
        return perimetro;
    }

    qtdVertices(){
        return this._vertices.length;
    }
}
       

function caracteristicas(poligono) {
    console.log(`O perímetro do polígono é ${poligono.perimeter()}`);
    console.log(`O polígono tem ${poligono.qtdVertices()} vértices`);
}

const prompt = require('prompt-sync')({ sigint: true });

// while enquanto o usuário quiser adicionar vértices
let vertices = [];
let continuar = true;
while (continuar){
    vertices.push(new Vertice(prompt('Digite o valor de x do vértice: '), prompt('Digite o valor de y do vértice: ')));
    continuar = prompt('Deseja adicionar mais um vértice? (s/n) ') === 's';
}

let poligono = new Poligono(vertices);

caracteristicas(poligono);

console.log("Adicione um novo vértice ao polígono:")
addX = prompt('Digite o valor de x do vértice: ');
addY = prompt('Digite o valor de y do vértice: ');
if (poligono.addVertice(new Vertice(addX, addY))){
    console.log("Vértice adicionado com sucesso");
    caracteristicas(poligono);
}
else{
    console.log("Vértice não adicionado pois já existe um vértice com as mesmas coordenadas");
}

