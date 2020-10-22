import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1. Testing the App.js file', () => {
  it('The main Pokédex page is rendered', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('The top of the application contains a fixed set of links', () => {
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

  it('The application is redirected to the home page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('The application is redirected to the about page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('The application is redirected to the favorite Pokémon page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('The application is redirected to the not found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notfound');
    expect(history.location.pathname).toBe('/notfound');

    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
