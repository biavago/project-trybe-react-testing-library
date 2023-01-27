import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';

test('Testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
  renderWithRouter(<FavoritePokemon />);
  const noPokemonFound = screen.getByText('No favorite Pokémon found');
  expect(noPokemonFound).toBeInTheDocument();
});

test('Testando se apenas são exibidos os Pokémon favoritados', () => {
  renderWithRouter(<App />);
  const dataTestId = 'pokemon-name';

  userEvent.click(screen.getByRole('link', { name: 'More details' }));
  const firstPokemon = screen.getByTestId(dataTestId).textContent;
  userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
  userEvent.click(screen.getByRole('link', { name: 'Home' }));
  userEvent.click(screen.getByRole('button', { name: 'Fire' }));
  userEvent.click(screen.getByRole('link', { name: 'More details' }));

  const secondPokemon = screen.getByTestId(dataTestId).textContent;
  userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
  userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémon' }));

  const favoritePokemons = screen.getAllByTestId(dataTestId);
  expect(favoritePokemons[0]).toHaveTextContent(firstPokemon);
  expect(favoritePokemons[1]).toHaveTextContent(secondPokemon);
  expect(favoritePokemons.length).toBe(2);
});
