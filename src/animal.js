class Animal {
    constructor(nome, especie, brinquedos) {
        this.nome = nome;
        this.especie = especie;
        this.brinquedos = brinquedos;
    }

    podeSerAdotadoPor(brinquedosPessoa, animaisAdotados = []) {

        if (this.especie === 'gato') {
            const brinquedosExclusivos = this.brinquedos.every(brinquedo =>
                !this.brinquedoEstaSendoUsadoPorOutroAnimal(brinquedo, animaisAdotados)
            );
            if (!brinquedosExclusivos) return false;
        }
        if (this.nome === 'Loco') {
            const temTodosBrinquedos = this.brinquedos.every(brinquedo => brinquedosPessoa.includes(brinquedo));
            const temCompanhia = animaisAdotados.length > 0;
            return temTodosBrinquedos && temCompanhia;
        } else {
            let indiceProximoBrinquedo = 0;

            for (const brinquedo of brinquedosPessoa) {
                if (indiceProximoBrinquedo < this.brinquedos.length && brinquedo === this.brinquedos[indiceProximoBrinquedo]) {
                    indiceProximoBrinquedo++;
                }
            }

            return indiceProximoBrinquedo === this.brinquedos.length;
        }
    }

    brinquedoEstaSendoUsadoPorOutroAnimal(brinquedo, animaisAdotados) {
        return animaisAdotados.some(animal =>
            animal !== this && animal.brinquedos.includes(brinquedo)
        );
    }
}

export { Animal as Animal };
