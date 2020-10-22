import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from './helpers/pokemonData';

describe('3. Testing the FavoritePokemons.js file', () => {
  it('The message No favorite pokemon found is displayed on the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('All favorite Pokémon cards are displayed', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const poke1 = getByText(/Pikachu/i);
    expect(poke1).toBeInTheDocument();

    const poke2 = getByText(/Charmander/i);
    expect(poke2).toBeInTheDocument();
  });

  it('No non-favorite Pokémon card is displayed', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(queryByText(/Ekans/i)).toBeNull();
    expect(queryByText(/Dragonair/i)).toBeNull();
  });
});
