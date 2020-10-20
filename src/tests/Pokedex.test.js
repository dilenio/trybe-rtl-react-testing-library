import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import { fireEvent, getByTestId } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from './helpers/favoriteData';
import favorite from './helpers/favoritePokemons';

describe('5. Testando o arquivo Pokedex.js', () => {
  it('Teste se é exibido o próximo Pokémon da lista', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const btn = getByRole('button', { name: 'Próximo pokémon'});
    expect(btn).toBeDefined();
    const poke1 = getByText(/Charmander/i);
    expect(poke1).toBeInTheDocument();
    fireEvent.click(btn);
    const poke2 = getByText(/Pikachu/i);
    expect(poke2).toBeInTheDocument();
    fireEvent.click(btn);
    const poke3 = getByText(/Charmander/i);
    expect(poke3).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const poke1 = queryByText(/Charmander/i);
    expect(poke1).toBeInTheDocument();

    const poke2 = queryByText(/Pikachu/i);
    expect(poke2).toBeNull();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const pokeTypes = ['Fire', 'Electric'];
    pokeTypes.forEach(element => {
      const btn = getByRole('button', { name: element});
      expect(btn).toBeDefined();
      fireEvent.click(btn);
      const poke1 = getByTestId('pokemonType');
      expect(poke1).toHaveTextContent(element);
    });
  });
});
