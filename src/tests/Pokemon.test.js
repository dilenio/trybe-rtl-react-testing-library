import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from './helpers/pokemonData';
import favorite from './helpers/pokemonFavorite';

describe('6. Testing the Pokemon.js file', () => {
  it('A card with the information of a certain Pokémon is rendered', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const poke1 = getByTestId('pokemon-name');
    expect(poke1).toHaveTextContent(/Charmander/i);

    const poke1Average = getByTestId('pokemon-weight');
    expect(poke1Average).toHaveTextContent('Average weight: 8.5 kg');

    const image = getByRole('img', {
      name: 'Charmander sprite',
      src: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    });
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    );
  });

  it('The Pokémon card indicated on the Pokédex contains a navigation link', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const detailsLink = getByRole('link', { href: '/pokemons/4' });
    expect(detailsLink).toBeInTheDocument();
  });

  it('Clicking on the Pokémon link redirects to details page', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const detailsLink = getByRole('link', { href: '/pokemons/4' });
    expect(detailsLink).toBeInTheDocument();
  });

  it('The URL displayed in the browser changes to /pokemon/<id>', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const detailsLink = getByRole('link', { href: '/pokemons/4' });
    expect(detailsLink).toBeInTheDocument();

    fireEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/4');
  });

  it('There is a star icon on favorite Pokémon', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const star = getByRole('img', {
      name: 'Charmander is marked as favorite',
      src: '/star-icon.svg',
    });
    expect(star).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(star).toBeDefined();
  });
});
