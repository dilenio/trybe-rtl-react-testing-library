import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from './helpers/pokemonData';
import favorite from './helpers/pokemonFavorite';

describe('5. Testing the Pokedex.js file', () => {
  it('The next Pokémon in the list is displayed', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const btn = getByRole('button', { name: 'Próximo pokémon' });
    expect(btn).toBeDefined();

    const poke1 = getByText(/Charmander/i);
    expect(poke1).toBeInTheDocument();

    fireEvent.click(btn);
    const poke2 = getByText(/Pikachu/i);
    expect(poke2).toBeInTheDocument();

    fireEvent.click(btn);
    const poke3 = getByText(/Charmander/i);
    expect(poke3).toBeInTheDocument();

    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('Only one Pokémon is shown at a time', () => {
    const { queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const poke1 = queryByText(/Charmander/i);
    expect(poke1).toBeInTheDocument();

    const poke2 = queryByText(/Pikachu/i);
    expect(poke2).toBeNull();
  });

  it('Pokédex has the filter buttons', () => {
    const { getByRole, getByTestId, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const pokeTypes = ['Fire', 'Electric'];
    pokeTypes.forEach((element) => {
      const btn = getByRole('button', { name: element });
      expect(btn).toBeDefined();

      fireEvent.click(btn);
      const poke1 = getByTestId('pokemonType');
      expect(poke1).toHaveTextContent(element);
    });

    const allBtn = getAllByTestId('pokemon-type-button');
    expect(allBtn.length.toString()).toBe('2');
  });

  it('The Pokédex contains a button to reset the filter', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const btn = getByRole('button', { name: 'All' });
    expect(btn).toBeDefined();

    fireEvent.click(btn);
    const nextBtn = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextBtn).toBeDefined();

    fireEvent.click(nextBtn);
    const poke2 = queryByText(/Pikachu/i);
    expect(poke2).toBeInTheDocument();

    fireEvent.click(nextBtn);
    const poke1 = queryByText(/Charmander/i);
    expect(poke1).toBeInTheDocument();
  });

  it('A filter button is created dynamically for each type', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const pokeTypes = ['Fire', 'Electric'];
    pokeTypes.forEach((typePoke) => {
      const allBtn = getByRole('button', { name: 'All' });
      expect(allBtn).toBeDefined();

      const typeBtn = getByRole('button', { name: typePoke });
      expect(typeBtn).toBeDefined();

      fireEvent.click(typeBtn);
      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType).toHaveTextContent(typePoke);
    });
  });

  it('The Next Pokémon button should be disabled when you have only one Pokémon', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favorite }
    />);
    const fireBtn = getByRole('button', { name: 'Fire' });
    expect(fireBtn).toBeDefined();

    fireEvent.click(fireBtn);
    const nextBtn = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextBtn).toHaveAttribute('disabled');
  });
});
