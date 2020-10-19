import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1. Testando o arquivo App.js', () => {
  it('Teste se a página principal da Pokédex é renderizada', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    const favorite = getByText('Favorite Pokémons');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });
});
