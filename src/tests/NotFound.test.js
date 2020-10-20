import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('4. Testando o arquivo NotFound.js', () => {
  test('Teste se página contém um heading h2 - Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const heading = getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const image = getAllByRole('img')[1];
    expect(image).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    );
  });
});
