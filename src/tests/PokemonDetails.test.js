import React from 'react';
import { fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from './helpers/pokemonData';
import favorite from './helpers/pokemonFavorite';
import renderWithRouter from './helpers/renderWithRouter';

describe('7. Testing PokemonDetails.js', () => {
  it('Detailed Pokemon information is shown', () => {
    const {
      getByRole,
      queryByRole,
      getByText,
      history,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favorite }
      pokemons={ pokemons }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
    />);

    history.push('/pokemons/4');
    const pokeTitle = getByText(/Charmander Details/i);
    expect(pokeTitle).toBeInTheDocument();

    const linkToDetails = queryByRole('link', { href: '/pokemons/4' });
    expect(linkToDetails).toBeNull();

    const heading = getByRole('heading', { name: 'Summary' });
    expect(heading).toBeInTheDocument();

    const summary = getByText(/The flame on its tail shows/i);
    expect(summary).toBeInTheDocument();
  });

  it('Section with maps and locations', () => {
    const {
      getAllByRole,
      getByText,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favorite }
      pokemons={ pokemons }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const heading = getByText(/Game Locations of Charmander/i);
    expect(heading).toBeInTheDocument();

    const pokeLocations = getAllByRole('img', { name: 'Charmander location' });
    expect(pokeLocations.length.toString()).toBe('4');

    pokeLocations.forEach((poke, index) => {
      expect(poke.nextElementSibling)
        .toHaveTextContent(pokemons[0].foundAt[index].location);
      expect(poke).toHaveAttribute('alt', 'Charmander location');
      expect(poke).toHaveAttribute(
        'src',
        pokemons[0].foundAt[index].map,
      );
    });
  });

  it('User can favorite a pokemon', () => {
    const {
      getByLabelText,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favorite }
      pokemons={ pokemons }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBeTruthy();

    fireEvent.change(checkbox, { target: { checked: false } });
    expect(checkbox.checked).toBeFalsy();
    
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toBeTruthy();
  });
});
