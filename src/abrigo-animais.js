import { Animal } from './animal.js';
import { ListaAbrigo, ListaBrinquedos } from './constantes.js';
import { Pessoa } from './pessoa.js';
import { Validacao } from './validacao.js';

class AbrigoAnimais {
  constructor() {
    this.animais = this.criarAnimais();
    // this.validacao = new Validacao();
  }

  criarAnimais() {
    return Object.entries(ListaAbrigo).map(([nome, dados]) => {
      return new Animal(nome, dados.especie, dados.brinquedos);
    })
  }

  listaAnimais() {
    return this.animais.sort().map(animal => `${animal.nome} - ${animal.especie} - [${animal.brinquedos.join(', ')}]`);
  }

  listaAdotados() {
    const adotados = this.animais.filter(animal => animal.adotado);
    return adotados.map(animal => `${animal.nome} - ${animal.especie} - [${animal.brinquedos.join(', ')}]`);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const brinquedos1 = brinquedosPessoa1.split(',').map(b => b.trim());
      const brinquedos2 = brinquedosPessoa2.split(',').map(b => b.trim());
      const animaisArray = ordemAnimais.split(',').map(a => a.trim());

      const errAnimais = Validacao.validarAnimais(animaisArray, ListaAbrigo);
      if (errAnimais.error) {
        return { erro: errAnimais.error };
      }

      const errDuplicados = Validacao.verificarDuplicados(brinquedos1, brinquedos2);
      if (errDuplicados.error) {
        return { erro: errDuplicados.error };
      }

      const errBrinquedos = Validacao.validarBrinquedos(brinquedos1, brinquedos2, ListaBrinquedos);
      console.log(errBrinquedos);
      if (errBrinquedos.error) {
        return { erro: errBrinquedos.error };
      }

      const pessoa1 = new Pessoa('1', brinquedos1);
      const pessoa2 = new Pessoa('2', brinquedos2);
      let resultado = [];

      for (const nomeAnimal of animaisArray) {
        const animal = this.animais.find(a => a.nome === nomeAnimal);

        const pessoa1PodeAdotar = pessoa1.podeAdotarAnimal(animal);
        const pessoa2PodeAdotar = pessoa2.podeAdotarAnimal(animal);

        if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
          resultado[animal.nome] = 'abrigo';
        }
        // Regra 1: O animal vai para a pessoa que mostrar todos os brinquedos na ordem
        else if (pessoa1PodeAdotar) {
          if (pessoa1.adotarAnimal(animal)) {
            resultado[animal.nome] = 'pessoa 1';
          } else {
            resultado[animal.nome] = 'abrigo';
          }
        } else if (pessoa2PodeAdotar) {
          if (pessoa2.adotarAnimal(animal)) {
            resultado[animal.nome] = 'pessoa 2';
          } else {
            resultado[animal.nome] = 'abrigo';
          }
        } else {
          resultado[animal.nome] = 'abrigo';

        }
      }
      const lista = Object.keys(resultado).sort().map(nome => `${nome} - ${resultado[nome]}`);

      return { lista };
    } catch (error) {
      return { erro: 'Erro inesperado' };
    }
  }
}
export { AbrigoAnimais as AbrigoAnimais };

