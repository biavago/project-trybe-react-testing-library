import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const moreDetails = 'More details';
const dataTestIdName = 'pokemon-name';

test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: moreDetails });
  expect(link.href).toContain(`/pokemon/${pokemonList[0].id}`);
});

test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
  renderWithRouter(<App />);
  const favoritePokemon = 'Pokémon favoritado?';
  const name = screen.getByTestId(dataTestIdName).textContent;
  userEvent.click(screen.getByRole('link', { name: moreDetails }));
  userEvent.click(screen.getByLabelText(favoritePokemon));
  const starIcon = screen.getByAltText(`${name} is marked as favorite`);
  expect(starIcon.src).toContain('/star-icon.svg');
  expect(starIcon).toBeInTheDocument();
});

test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);
  const name = screen.getByTestId(dataTestIdName);
  expect(name).toBeInTheDocument();
  expect(name.textContent).toBe(pokemonList[0].name);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.textContent).toBe(pokemonList[0].type);
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toBeInTheDocument();
  const { averageWeight: { value, measurementUnit } } = pokemonList[0];
  expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
  const img = screen.getByAltText(`${name.textContent} sprite`);
  const imgURL = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
  expect(img.src).toBe(imgURL);
  expect(img).toBeInTheDocument();
});

test('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon / Testando também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
  const { history } = renderWithRouter(<App />);
  const name = screen.getByTestId(dataTestIdName);
  const link = screen.getByRole('link', { name: moreDetails });
  userEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemon/${pokemonList[0].id}`);
  const id = Number(pathname.slice(9, 11));
  const pokemon = pokemonList.find((li) => li.id === id);
  expect(name.textContent).toBe(pokemon.name);
});
