import React from 'react';
import { fireEvent, queryByRole } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from './helpers/favoriteData';
import favorite from './helpers/favoritePokemons';
import renderWithRouter from './helpers/renderWithRouter';

describe('7. Testando o arquivo PokemonDetails.js', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const {
      getByRole,
      queryByRole,
      getByText,
      history
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

  it('este se existe na página uma seção com os mapas contendo as localizações', () => {
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
    const four = 4;
    expect(pokeLocations.length).toBe(four);
    expect(pokeLocations[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    );
    expect(pokeLocations[0].nextElementSibling).toHaveTextContent(/Alola Route 3/i);
    expect(pokeLocations[0]).toHaveAttribute('alt', 'Charmander location');
    expect(pokeLocations[1]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    );
    expect(pokeLocations[1].nextElementSibling).toHaveTextContent(/Kanto Route 3/i);
    expect(pokeLocations[1]).toHaveAttribute('alt', 'Charmander location');
    expect(pokeLocations[2]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    );
    expect(pokeLocations[2].nextElementSibling).toHaveTextContent(/Kanto Route 4/i);
    expect(pokeLocations[2]).toHaveAttribute('alt', 'Charmander location');
    expect(pokeLocations[3]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    );
    expect(pokeLocations[3].nextElementSibling).toHaveTextContent(/Kanto Rock Tunnel/i);
    expect(pokeLocations[3]).toHaveAttribute('alt', 'Charmander location');
  });

  it('Teste se o usuário pode favoritar um pokémon', () => {
    const {
      getByRole,
      getByText,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ favorite }
      pokemons={ pokemons }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBeTruthy();
    fireEvent.change(checkbox, { target: { checked: false } });
    expect(checkbox.checked).toBeFalsy();
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toBeTruthy();
  });
});
