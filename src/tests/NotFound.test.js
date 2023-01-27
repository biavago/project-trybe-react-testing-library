import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Testa se a página contém um heading h2 com o texto "Page requested not found"', () => {
  renderWithRouter(<NotFound />);
  const h2 = screen.getByRole('heading', { level: 2 });
  expect(h2).toHaveTextContent('Page requested not found');
  expect(h2).toBeInTheDocument();
});

test('Testa se a página mostra a imagem do Pikachu chorando', () => {
  renderWithRouter(<NotFound />);
  const img = screen.getByRole('img');
  const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(img.src).toBe(imgURL);
});
