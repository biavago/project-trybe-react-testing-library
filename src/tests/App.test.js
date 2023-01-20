import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se no topo aparece um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const home = screen.getByText(/Home/i);
  const about = screen.getByText(/About/i);
  const favoritePokemon = screen.getByText(/Favorite Pokémon/i);
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemon).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
  renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
  renderWithRouter(<App />);
  const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(favoritePokemonLink).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  const { history } = renderWithRouter(<App />);

  const INVALID_URL = '/blablabla';
  act(() => {
    history.push(INVALID_URL);
  });

  const notFoundTitle = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(notFoundTitle).toBeInTheDocument();
});
