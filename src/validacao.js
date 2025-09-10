class Validacao {    

    static validarAnimais(ordemAnimals, ListaAbrigo) { 
        const animaisValidos = Object.keys(ListaAbrigo);    

        for (const animal of ordemAnimals) {
            if (typeof animal !== 'string' || !animaisValidos.includes(animal)) {
                return { error: 'Animal inválido' };
            }
        }
        return { error: null };
    }

    static verificarDuplicados(brinquedosPessoa1, brinquedosPessoa2) {

        const repetido1 = brinquedosPessoa1.find((item, idx) => brinquedosPessoa1.indexOf(item) !== idx);
        const repetido2 = brinquedosPessoa2.find((item, idx) => brinquedosPessoa2.indexOf(item) !== idx);
        if (repetido1 || repetido2) {
            return { error: 'Brinquedo inválido' };
        }
        return { error: null };
    }
    
    static validarBrinquedos(brinquedosPessoa1, brinquedosPessoa2, ListaBrinquedos) {

        const brinquedosPessoas = [...brinquedosPessoa1, ...brinquedosPessoa2];

        for (const brinquedo of brinquedosPessoas) {
            if (!ListaBrinquedos.includes(brinquedo)) {
                return { error: `Brinquedo inválido: ${brinquedo}` };
            }
        }
        return { error: null };
    }
}

export { Validacao };

