import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from './helpers/favoriteData';

describe('3. Testando o arquivo FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const poke1 = getByText(/Pikachu/i);
    expect(poke1).toBeInTheDocument();
    const poke2 = getByText(/Charmander/i);
    expect(poke2).toBeInTheDocument();
  });

  it('Teste se Não é exibido nenhum card de pokémon não favoritado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    expect(queryByText(/Ekans/i)).toBeNull();
    expect(queryByText(/Dragonair/i)).toBeNull();
  });
});
