import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);
  const encounteredPokemon = 'Encountered Pokémon';
  const h2 = screen.getByRole('heading', { level: 2 });
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent(encounteredPokemon);
});

const nextPokemon = 'Próximo Pokémon';

test('Testa se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);
  const dataTestId = 'pokemon-name';
  const nextButton = screen.getByRole('button', { name: nextPokemon });
  pokemonList.forEach(() => {
    expect(screen.getAllByTestId(dataTestId)).toHaveLength(1);
    userEvent.click(nextButton);
  });
});

test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  renderWithRouter(<App />);
  const dataTestId = 'pokemon-name';
  const nextButton = screen.getByRole('button', { name: nextPokemon });
  expect(nextButton).toBeInTheDocument();
  pokemonList.forEach((pokemon) => {
    expect(screen.getByTestId(dataTestId).textContent).toBe(pokemon.name);
    userEvent.click(nextButton);
  });
  expect(screen.getByTestId(dataTestId).textContent).toBe(pokemonList[0].name);
});

test('Testa se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const dataTestId = 'pokemon-type-button';
  const all = 'All';
  const nextButton = screen.getByRole('button', { name: nextPokemon });
  const allButton = screen.getByRole('button', { name: all });
  const filterButton = screen.getAllByTestId(dataTestId);
  filterButton.forEach((button) => {
    userEvent.click(button);
    pokemonList.forEach(() => {
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(button.textContent).toBe(pokemonType.textContent);
      expect(allButton).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
});

test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const all = 'All';
  const allButton = screen.getByRole('button', { name: all });
  expect(allButton).toBeInTheDocument();
  const dataTestId = 'pokemon-type';
  const dataTestId2 = 'pokemon-type-button';
  const nextButton = screen.getByRole('button', { name: nextPokemon });
  const firstType = screen.getByTestId(dataTestId).textContent;
  userEvent.click(nextButton);
  const filterButton = screen.getAllByTestId(dataTestId2);
  const secondType = screen.getByTestId(dataTestId).textContent;
  expect(firstType).not.toBe(secondType);
  userEvent.click(filterButton[0]);
  userEvent.click(allButton);
  const thirdType = screen.getByTestId(dataTestId).textContent;
  userEvent.click(nextButton);
  const forthType = screen.getByTestId(dataTestId).textContent;
  expect(thirdType).not.toBe(forthType);
});
