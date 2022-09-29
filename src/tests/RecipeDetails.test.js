import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const MEAL_DETAIL_PATHNAME = '/meals/52977';

describe('Testes do componente RecipeDetails em meals', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Se ao entrar na rota com id 52977 os detalhes da receita aparecem', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [MEAL_DETAIL_PATHNAME] });

    const mealTitle = await screen.findByText('Corba');

    await waitFor(() => expect(mealTitle).toBeInTheDocument());

    expect(mealTitle).toBeInTheDocument();
  });
  test('Se ao clicar no botão de Start Recipe muda a rota para 529977/in-progress', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [MEAL_DETAIL_PATHNAME] },
    );

    const startRecipeButton = await screen.findByTestId('start-recipe-btn');

    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  // test('Se ao clicar no botão de Share, copia a url ', async () => {
  //   renderWithRouterAndRedux(<App />, { initialEntries: [MEAL_DETAIL_PATHNAME] });
  //   window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

  //   const recommendedMeal = await screen.findByTestId('0-recommendation-card');

  //   await waitFor(() => expect(recommendedMeal).toBeInTheDocument());

  //   const shareButton = screen.getByTestId('share-btn');

  //   userEvent.click(shareButton);

  //   const copiedLink = screen.getByText('Link copied!');
  //   waitFor(() => expect(copiedLink).toBeInTheDocument());
  // });
});

describe('Testes do componente RecipeDetails em drinks', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Se ao entrar na rota com id 13501 os detalhes da receita aparecem', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/13501'] });

    const mealTitle = await screen.findByText('ABC');

    expect(mealTitle).toBeInTheDocument();
  });
  test('Se ao clicar no botão de Start Recipe muda a rota para 13501/in-progress', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/13501'] });

    const startRecipeButton = await screen.findByTestId('start-recipe-btn');

    expect(startRecipeButton).toBeInTheDocument();

    userEvent.click(startRecipeButton);

    expect(history.location.pathname).toBe('/drinks/13501/in-progress');
  });
});
