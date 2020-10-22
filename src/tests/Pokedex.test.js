import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from './helpers/pokemonData';
import favorite from './helpers/pokemonFavorite';

describe('5. Testando o arquivo Pokedex.js', () => {
  it('Teste se é exibido o próximo Pokémon da lista', () => {
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
    const two = 2;
    const allBtn = getAllByTestId('pokemon-type-button');
    expect(allBtn.length).toBe(two);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
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

  it('Teste se é criado, dinamicamente, um botão de filtro para cada tipo', () => {
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

  it('O botão Próximo pokémon deve ser desabilitado quando tiver um só pokémon', () => {
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
