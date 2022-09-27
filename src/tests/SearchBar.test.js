import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockChiken from './helpers/mockChicken';
import mockSoup from './helpers/mockSoup';
import mockFirstLetterMeals from './helpers/mockFirstLetterMeals';
import mockLemon from './helpers/mockLemon';
import mockOnlyOneItemMeals from './helpers/mockOnlyOneItemMeals';
import mockOnlyOneItemDrinks from './helpers/mockOnlyOneItemDrinks';
import mockFirstLetterDrinks from './helpers/mockFirstLetterDrinks';
import mockVodka from './helpers/mockVodka';

const PAGE_TITLE_TESTID = 'page-title';
const SEARCH_INPUT_TESTID = 'search-input';
const HEADER_BUTTON_TESTID = 'search-top-btn';
const SEARCHBAR_BUTTON_TESTID = 'exec-search-btn';
const RADIO_FIRSTLETTER_TESTID = 'first-letter-search-radio';
const RADIO_NAME_TESTID = 'name-search-radio';
const RECIPES_NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';
const ONE_LETTER_ALERT = 'Your search must have only 1 (one) character';
const CARD_NAME_TESTID = '0-card-name';

describe('Testes do componente SearchBar', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Se a searchBar não está visível ao entrar na rota meals', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    const searchInput = screen.queryByTestId(SEARCH_INPUT_TESTID);

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/meals/i);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('Se ao clicar no botão de pesquisa no Header, o searchBar aparece', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/meals/i);
    expect(searchHeaderButton).toBeInTheDocument();

    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    expect(searchInput).toBeInTheDocument();
  });

  test('Se ao digitar no input em meals, clicar no radio ingredient e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockChiken),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    const brownChicken = await screen.findByTestId('0-recipe-card');

    await waitFor(() => expect(brownChicken).toBeInTheDocument());

    expect(brownChicken).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();
  });

  test('Se ao digitar no input em meals, clicar no radio name e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockSoup),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioName = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'soup');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    const lebleliSoup = await screen.findByTestId(CARD_NAME_TESTID);

    await waitFor(() => expect(lebleliSoup).toBeInTheDocument());

    expect(lebleliSoup).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();
  });

  test('Se ao digitar no input em meals, clicar no radio firstletter e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockFirstLetterMeals),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    const appleFrangipan = await screen.findByTestId(CARD_NAME_TESTID);

    await waitFor(() => expect(appleFrangipan).toBeInTheDocument());

    expect(appleFrangipan).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();
  });

  test('Se ao digitar no input em drinks, clicar no radio ingredient e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockLemon),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'lemon');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    const aTrueAmaretto = await screen.findByTestId(CARD_NAME_TESTID);

    await waitFor(() => expect(aTrueAmaretto).toBeInTheDocument());

    expect(aTrueAmaretto).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();
  });

  test('Se ao digitar no input em drinks, clicar no radio name e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockVodka),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioName = screen.getByTestId(RADIO_NAME_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'vodka');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    const longVodka = await screen.findByTestId(CARD_NAME_TESTID);

    await waitFor(() => expect(longVodka).toBeInTheDocument());

    expect(longVodka).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();
  });

  test('Se ao digitar no input em drinks, clicar no radio firstletter e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockFirstLetterDrinks),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    const a1 = await screen.findByTestId(CARD_NAME_TESTID);

    await waitFor(() => expect(a1).toBeInTheDocument());

    expect(a1).toBeInTheDocument();

    expect(searchButton).toBeInTheDocument();
  });

  test('Se ao digitar no input em meals, clicar no radio name e clicar em Search recebe apenas um item e muda de rota', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockOnlyOneItemMeals),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioName = screen.getByTestId(RADIO_NAME_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    const recipeDetails = await screen.findByText('RecipeDetails');
    expect(recipeDetails).toBeInTheDocument();

    console.log(history.location.pathname);
    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('Se ao digitar no input em drinks, clicar no radio name e clicar em Search recebe apenas um item e muda de rota', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockOnlyOneItemDrinks),
    });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioName = screen.getByTestId(RADIO_NAME_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    const recipeDetails = await screen.findByText('RecipeDetails');
    expect(recipeDetails).toBeInTheDocument();

    console.log(history.location.pathname);
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  test('Se ao digitar mais de uma letra no input em meals, clicar no radio firstletter e clicar em Search faz um alerta', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(window, 'alert').mockImplementation(() => ONE_LETTER_ALERT);

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(ONE_LETTER_ALERT));
    expect(searchButton).toBeInTheDocument();
  });

  test('Se ao digitar mais de uma letra no input em drinks, clicar no radio firstletter e clicar em Search faz um alerta', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(window, 'alert').mockImplementation(() => ONE_LETTER_ALERT);

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(ONE_LETTER_ALERT));
    expect(searchButton).toBeInTheDocument();
  });

  test(' Exiba um `alert` caso nenhuma receita em meals seja encontrada', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(window, 'alert').mockImplementation(() => RECIPES_NOT_FOUND);

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_NAME_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(RECIPES_NOT_FOUND));
    expect(searchButton).toBeInTheDocument();
  });

  test(' Exiba um `alert` caso nenhuma receita em drinks seja encontrada', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(window, 'alert').mockImplementation(() => RECIPES_NOT_FOUND);

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_NAME_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'xablau');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(RECIPES_NOT_FOUND));
    expect(searchButton).toBeInTheDocument();
  });
});
