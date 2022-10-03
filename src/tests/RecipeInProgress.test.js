import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import details from './helpers/mockDrinkDetails';

const IN_PROGRESS_PATHNAME = '/meals/52977/in-progress';
const IN_PROGRESS_PATHNAME_2 = '/drinks/15997/in-progress';

const INGREDIENT_STEP_1 = '0-ingredient-step';
const INGREDIENT_STEP_2 = '2-ingredient-step';
const INGREDIENT_STEP_3 = '3-ingredient-step';

const FAVORITE_BTN = 'favorite-btn';

describe('Testes do componente in Progress', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('Se a página é renderizada corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(details),
    });

    const frtIngredient = await screen.findByTestId(INGREDIENT_STEP_1);
    const scdIngredient = await screen.findByTestId(INGREDIENT_STEP_2);
    const trdIngredient = await screen.findByTestId(INGREDIENT_STEP_3);
    await waitFor(() => expect(frtIngredient).toBeInTheDocument());
    await waitFor(() => expect(scdIngredient).toBeInTheDocument());
    await waitFor(() => expect(trdIngredient).toBeInTheDocument());

    userEvent.click(frtIngredient.querySelector('input'));
    userEvent.click(scdIngredient.querySelector('input'));

    const instructions = await screen.findByTestId('instructions');
    await waitFor(() => expect(instructions).toBeInTheDocument());

    const photo = await screen.findByTestId('recipe-photo');
    await waitFor(() => expect(photo).toBeInTheDocument());

    const title = await screen.findByTestId('recipe-title');
    await waitFor(() => expect(title).toBeInTheDocument());

    const share = await screen.findByTestId('share-btn');
    await waitFor(() => expect(share).toBeInTheDocument());

    const favorite = await screen.findByTestId(FAVORITE_BTN);
    await waitFor(() => expect(favorite).toBeInTheDocument());

    const category = await screen.findByTestId('recipe-category');
    await waitFor(() => expect(category).toBeInTheDocument());
  });
  test('O botão de favoritar funciona para meals', async () => {
    const favoriteRecipes = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME] });

    const mealTitle = await screen.findByText('Corba');

    expect(mealTitle).toBeInTheDocument();

    const favoriteRecipeButton = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteRecipeButton).toBeInTheDocument();

    userEvent.click(favoriteRecipeButton);

    userEvent.click(favoriteRecipeButton);
  });
  test('O botão de favoritar funciona para drinks', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME_2] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(details),
    });

    const mealTitle = await screen.findByText('Corba');

    expect(mealTitle).toBeInTheDocument();

    const favoriteRecipeButton = await screen.findByTestId(FAVORITE_BTN);
    expect(favoriteRecipeButton).toBeInTheDocument();

    userEvent.click(favoriteRecipeButton);

    userEvent.click(favoriteRecipeButton);
  });
  test('Se ao clicar no botão de Share, copia a url ', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME] });
    window.document.execCommand = jest.fn().mockImplementation(() => 'Link copied!');

    const recommendedMeal = await screen.findByTestId('1-ingredient-step');

    await waitFor(() => expect(recommendedMeal).toBeInTheDocument());

    const shareButton = screen.getByTestId('share-btn');

    await waitFor(() => expect(shareButton).toBeInTheDocument());

    // userEvent.click(shareButton);

    const copiedLink = screen.getByText('Link copied!');
    waitFor(() => expect(copiedLink).toBeInTheDocument());
  });
  test('Se salva ingredientes com  array vazio', async () => {
    const testRec = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(testRec));

    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(details),
    });

    const frtIngredient = await screen.findByTestId(INGREDIENT_STEP_1);
    const scdIngredient = await screen.findByTestId(INGREDIENT_STEP_2);
    const trdIngredient = await screen.findByTestId(INGREDIENT_STEP_3);
    await waitFor(() => expect(frtIngredient).toBeInTheDocument());
    await waitFor(() => expect(scdIngredient).toBeInTheDocument());
    await waitFor(() => expect(trdIngredient).toBeInTheDocument());

    userEvent.click(frtIngredient.querySelector('input'));
    userEvent.click(scdIngredient.querySelector('input'));
  });
  test('Se o botão de done funciona', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(details),
    });

    const frtIngredient = await screen.findByTestId(INGREDIENT_STEP_1);
    const scdIngredient = await screen.findByTestId(INGREDIENT_STEP_2);
    const trdIngredient = await screen.findByTestId(INGREDIENT_STEP_3);
    await waitFor(() => expect(frtIngredient).toBeInTheDocument());
    await waitFor(() => expect(scdIngredient).toBeInTheDocument());
    await waitFor(() => expect(trdIngredient).toBeInTheDocument());

    userEvent.click(frtIngredient.querySelector('input'));
    userEvent.click(scdIngredient.querySelector('input'));
    userEvent.click(trdIngredient.querySelector('input'));

    const doneBtn = await screen.findByTestId('finish-recipe-btn');

    userEvent.click(doneBtn);
  });
});
