import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockChiken from './helpers/mockChicken';
import mockMealCategories from './helpers/mockMealCategories';
import mockBeef from './helpers/mockBeef';

describe('Testes do componente Meals', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Se os cards são renderizados', async () => {
    const { container } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockChiken),
    });

    const brownChicken = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(brownChicken).toBeInTheDocument());

    const pics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(pics.length).toBe(12));
  });

  test('Se os filtros de categoria funcionam', async () => {
    const { container } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockMealCategories),
    });

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    await waitFor(() => expect(beefBtn).toBeInTheDocument());

    const catBtn = container.getElementsByClassName('categoryButton');
    await waitFor(() => expect(catBtn.length).toBe(6));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockBeef),
    });

    userEvent.click(catBtn[0]);

    const beefPics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(beefPics.length).toBe(2));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockChiken),
    });

    userEvent.click(catBtn[0]);

    const chickenPics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(chickenPics.length).toBe(2));
  });

  test('Se o botão de All do filtro funciona', async () => {
    const { container } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockMealCategories),
    });

    const beefBtn = await screen.findByTestId('Beef-category-filter');
    await waitFor(() => expect(beefBtn).toBeInTheDocument());

    const catBtn = container.getElementsByClassName('categoryButton');
    await waitFor(() => expect(catBtn.length).toBe(6));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockBeef),
    });

    userEvent.click(catBtn[0]);

    const beefPics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(beefPics.length).toBe(2));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockChiken),
    });

    userEvent.click(catBtn[5]);

    const chickenPics = container.getElementsByClassName('thumbnail');
    await waitFor(() => expect(chickenPics.length).toBe(2));
  });

  test('Se ao clicar no card ocorre o redirecionamento', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockChiken),
    });

    const brownChicken = await screen.findByTestId('0-recipe-card');
    await waitFor(() => expect(brownChicken).toBeInTheDocument());

    jest.restoreAllMocks();

    jest.spyOn(global, 'fetch');

    userEvent.click(brownChicken);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    expect(history.location.pathname).toBe('/meals/52977');
  });
});
