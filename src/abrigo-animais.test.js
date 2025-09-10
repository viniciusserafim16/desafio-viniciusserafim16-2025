import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar pessoas com brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,BOLA',
      'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar pessoas com brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,XICARA',
      'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido: XICARA');
    expect(resultado.lista).toBeFalsy();
  });

  test('Não deve adotar Loco sem companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO,BOLA',
      'RATO,NOVELO,BOLA,LASER,CAIXA', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve adotar Loco com companhia e todos os brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,BOLA',
      'RATO,NOVELO,BOLA,SKATE,CAIXA', 'Rex,Loco');
    expect(resultado.lista[0]).toBe('Loco - pessoa 2');
    expect(resultado.lista[1]).toBe('Rex - pessoa 2');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve listar animais do abrigo', () => {
    const lista = new AbrigoAnimais().listaAnimais();
    expect(lista.length).toBe(7);
    expect(lista[0]).toBe('Rex - cão - [RATO, BOLA]');
    expect(lista[1]).toBe('Mimi - gato - [BOLA, LASER]');
    expect(lista[2]).toBe('Fofo - gato - [BOLA, RATO, LASER]');
    expect(lista[3]).toBe('Zero - gato - [RATO, BOLA]');
    expect(lista[4]).toBe('Bola - cão - [CAIXA, NOVELO]');
    expect(lista[5]).toBe('Bebe - cão - [LASER, RATO, BOLA]');
    expect(lista[6]).toBe('Loco - jabuti - [SKATE, RATO]');
  });

  test('Não deve adotar mais que 3 animais: Bebe ficara de fora da adoção', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'LASER,RATO,BOLA,CAIXA,NOVELO,SKATE', 'Rex,Bola,Loco,Bebe,Mimi');
    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Bola - pessoa 2');
    expect(resultado.lista[2]).toBe('Loco - pessoa 2');
    expect(resultado.lista[3]).toBe('Mimi - pessoa 1');
    expect(resultado.lista[4]).toBe('Rex - pessoa 2');
    expect(resultado.lista.length).toBe(5);

    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve conseguir adotar mais de 1 gato', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,LASER',
      'NOVELO,SKATE', 'Mimi,Zero');
    expect(resultado.lista[0]).toBe('Mimi - pessoa 1');
    expect(resultado.lista[1]).toBe('Zero - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Gato rejeita adoção se brinquedos estão compartilhados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER', 'BOLA,LASER', 'Mimi,Zero')
    expect(resultado.lista[0]).toBe('Mimi - abrigo');
    expect(resultado.lista[1]).toBe('Zero - abrigo');
    expect(resultado.error).toBeUndefined();
  });
});

