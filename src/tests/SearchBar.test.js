import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

const PAGE_TITLE_TESTID = 'page-title';
const SEARCH_INPUT_TESTID = 'search-input';
const HEADER_BUTTON_TESTID = 'search-top-btn';
const SEARCHBAR_BUTTON_TESTID = 'exec-search-btn';
const RADIO_FIRSTLETTER_TESTID = 'first-letter-search-radio';

describe('Testes do componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockData),
    });
  });

  test('Se a searchBar não está visível ao entrar na rota meals', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    const searchInput = screen.queryByTestId(SEARCH_INPUT_TESTID);

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/meals/i);
    expect(searchInput).not.toBeInTheDocument();
  });

  test('Se a searchBar não está visível ao entrar na rota meals', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    const searchInput = screen.queryByTestId(SEARCH_INPUT_TESTID);

    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/drinks/i);
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

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Se ao digitar no input em meals, clicar no radio name e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioName = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'soup');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Se ao digitar no input em meals, clicar no radio firstletter e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Se ao digitar no input em drinks, clicar no radio ingredient e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(radioIngredient);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Se ao digitar no input em drinks, clicar no radio name e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioName = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'soup');
    userEvent.click(radioName);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Se ao digitar no input em drinks, clicar no radio firstletter e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'a');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Se ao digitar mais de uma letra no input em meals, clicar no radio firstletter e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Se ao digitar mais de uma letra no input em drinks, clicar no radio firstletter e clicar em Search faz uma requisição', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchHeaderButton = screen.getByTestId(HEADER_BUTTON_TESTID);
    userEvent.click(searchHeaderButton);

    const searchInput = await screen.findByTestId(SEARCH_INPUT_TESTID);
    const radioFirstLetter = screen.getByTestId(RADIO_FIRSTLETTER_TESTID);
    const searchButton = screen.getByTestId(SEARCHBAR_BUTTON_TESTID);

    userEvent.type(searchInput, 'aa');
    userEvent.click(radioFirstLetter);
    userEvent.click(searchButton);

    expect(searchButton).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });
});
