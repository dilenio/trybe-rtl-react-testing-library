import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('2. Testing the About.js file', () => {
  it('The page contains information about Pokédex', () => {
    const { getByText, history } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();

    history.push('/about');
    expect(history.location.pathname).toBe('/about');
  });

  it('The page contains two paragraphs with text about Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const text = getAllByText(/Pokémons/i);
    expect(text.length.toString()).toBe('2');
  });

  it('The page contains the following image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const cdn = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/';
    const img = '800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      `${cdn}${img}`,
    );
  });
});
