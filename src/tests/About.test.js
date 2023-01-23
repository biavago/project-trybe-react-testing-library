import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const img = screen.getByRole('img');
  const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(img.src).toBe(url);
});

test('Testa se a página contém um heading h2 com o texto About Pokédex;', () => {
  renderWithRouter(<About />);
  const h2 = screen.getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
  renderWithRouter(<About />);
  const paragraphs = screen.getAllByTestId('paragraphs-about-pokedex');
  expect(paragraphs.length).toBe(2);
});

test('Testa se a página contém o texto About Pokédex;', () => {
  renderWithRouter(<About />);
  const h2Text = screen.getByText('About Pokédex');
  expect(h2Text).toBeInTheDocument();
});
