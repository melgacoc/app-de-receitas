import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockVodka from './helpers/mockChicken';
import drinkCategories from './helpers/mockDrinkCategories';
import ordinaryDrinks from './helpers/mockOrdinaryDrinks';

describe('Testes do componente Drinks', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Se os cards são renderizados', async () => {
    const { container } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockVodka),
    });

    const firstVodka = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(firstVodka).toBeInTheDocument());

    const pics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(pics.length).toBe(12));
  });

  test('Se os filtros de categoria funcionam', async () => {
    const { container } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(drinkCategories),
    });

    const ordinaryBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    await waitFor(() => expect(ordinaryBtn).toBeInTheDocument());

    const catBtn = container.getElementsByClassName('categoryButton');
    await waitFor(() => expect(catBtn.length).toBe(6));

    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(ordinaryDrinks),
    });

    userEvent.click(catBtn[0]);

    const drinksPic = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(drinksPic.length).toBe(2));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockVodka),
    });

    userEvent.click(catBtn[0]);

    const chickenPics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(chickenPics.length).toBe(2));
  });

  test('Se o botão de All do filtro funciona', async () => {
    const { container } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(drinkCategories),
    });

    // const ordinaryBtn = await screen.findByTestId('Ordinary Drink-category-filter');
    // await waitFor(() => expect(ordinaryBtn).toBeInTheDocument());

    const catBtn = container.getElementsByClassName('categoryButton');
    await waitFor(() => expect(catBtn.length).toBe(6));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(ordinaryDrinks),
    });

    userEvent.click(catBtn[0]);

    const drinksPic = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(drinksPic.length).toBe(2));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockVodka),
    });

    userEvent.click(catBtn[5]);

    const drinkPics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(drinkPics.length).toBe(2));
  });

  test('Se ao clicar no card ocorre o redirecionamento', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockVodka),
    });

    const firstVodka = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(firstVodka).toBeInTheDocument());

    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');

    userEvent.click(firstVodka);
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
