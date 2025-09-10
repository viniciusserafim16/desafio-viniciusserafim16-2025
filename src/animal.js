class Animal {
    constructor(nome, especie, brinquedos) {
        this.nome = nome;
        this.especie = especie;
        this.brinquedos = brinquedos;
    }

    podeSerAdotadoPor(brinquedosPessoa, animaisAdotados = []) {


        if (this.especie === 'gato') {
            // Gato exige que TODOS seus brinquedos sejam EXCLUSIVOS para ele
            const brinquedosExclusivos = this.brinquedos.every(brinquedo =>
                !this.brinquedoEstaSendoUsadoPorOutroAnimal(brinquedo, animaisAdotados)
            );
            if (!brinquedosExclusivos) return false;
        }
        if (this.nome === 'Loco') {
            // Regra especial para Loco
            const temTodosBrinquedos = this.brinquedos.every(brinquedo => brinquedosPessoa.includes(brinquedo));
            const temCompanhia = animaisAdotados.length > 0;
            return temTodosBrinquedos && temCompanhia;
        } else {
            // Para outros animais: verifica ordem dos brinquedos
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
