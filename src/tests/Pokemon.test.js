import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from './helpers/favoriteData';
import favorite from './helpers/favoritePokemons';

describe('6. Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const poke1 = getByTestId('pokemon-name');
    expect(poke1).toHaveTextContent(/Charmander/i);
    const poke1Average = getByTestId('pokemon-weight');
    expect(poke1Average).toHaveTextContent(/Average weight: 8.5 kg/i);
    const image = getByRole('img', {
      name: 'Charmander sprite',
      src: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    });
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    );
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém link de navegação', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const detailsLink = getByRole('link', { href: '/pokemons/4' });
    expect(detailsLink).toBeInTheDocument();
  });

  it('Teste se ao clicar no link do Pokémon, é feito redirecionamento', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ favorite[pokemons[0].id] }
    />);
    const detailsLink = getByRole('link', { href: '/pokemons/4' });
    expect(detailsLink).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
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

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
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
