import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });
describe('1. Testando o arquivo App.js', () => {
  it('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /.', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favorite = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    const pathHome = history.location.pathname;
    expect(pathHome).toBe('/');

    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const pathAbout = history.location.pathname;
    expect(pathAbout).toBe('/about');

    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    const pathFavorites = history.location.pathname;
    expect(pathFavorites).toBe('/favorites');
  });


});
