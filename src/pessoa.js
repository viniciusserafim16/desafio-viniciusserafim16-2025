class Pessoa {
    constructor(numero, brinquedos) {
        this.numero = numero;
        this.brinquedos = brinquedos;
        this.animaisAdotados = [];
    }

    podeAdotar() {
        return this.animaisAdotados.length < 3;
    }

    adotarAnimal(animal) {
        if (this.podeAdotar(animal)) {
            this.animaisAdotados.push(animal);
            return true;
        }
        return false;
    }

    podeAdotarAnimal(animal) {
        if (!this.podeAdotar(animal)){
            return false;
        } 
        return animal.podeSerAdotadoPor(this.brinquedos, this.animaisAdotados);
    }
}

export { Pessoa as Pessoa };
