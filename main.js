import { AbrigoAnimais } from './src/abrigo-animais.js';
class Main {
    static main() {
        const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'LASER,RATO,BOLA,CAIXA,NOVELO,SKATE', 'Rex,Bola,Loco,Bebe,Mimi');
        if (resultado.erro) {
            console.log("Erro:", resultado.erro);
        } else {
            console.log("Lista:", resultado.lista);
        }
    }
}

Main.main();
