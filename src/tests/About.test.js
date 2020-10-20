import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';
import { getAllByText } from '@testing-library/react';

describe('2. Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);

    expect(heading).toBeInTheDocument();
    history.push('/about');
    expect(history.location.pathname).toBe('/about');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText, getAllByRole } = renderWithRouter(<About />);
    const text = getAllByText(/Pokémons/i);

    expect(text.length).toBe(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
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
