import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('4. Testing the NotFound.js file', () => {
  it('The page contains an h2 heading - Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('The page shows the image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img')[1];
    expect(image).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
