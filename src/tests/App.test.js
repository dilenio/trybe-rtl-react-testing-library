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
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notfound');
    expect(history.location.pathname).toBe('/notfound');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
