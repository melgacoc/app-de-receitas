import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const ALL_BUTTON_TESTID = 'filter-by-all-btn';
const MEAL_BUTTON_TESTID = 'filter-by-meal-btn';
const DRINK_BUTTON_TESTID = 'filter-by-drink-btn';
const SHARE_BUTTON_TESTID = '0-horizontal-share-btn';
const IMAGE_TESTID = '0-horizontal-image';
const NAME_TESTID = '0-horizontal-name';

describe('Header Test', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  test('Testing page buttons', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');

    const allButton = screen.getByTestId(ALL_BUTTON_TESTID);
    const mealButton = screen.getByTestId(MEAL_BUTTON_TESTID);
    const drinkButton = screen.getByTestId(DRINK_BUTTON_TESTID);
    const sharekButton = screen.getByTestId(SHARE_BUTTON_TESTID);
    const firstImage = screen.getByTestId(IMAGE_TESTID);

    expect(allButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(sharekButton).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', doneRecipes[0].image);

    userEvent.click(sharekButton);
    const copiedLink = screen.getByText('Link copied!');
    waitFor(() => expect(copiedLink).toBeInTheDocument());

    userEvent.click(mealButton);
    const firstImageMeal = await screen.findByTestId(IMAGE_TESTID);
    expect(firstImageMeal).toHaveAttribute('src', doneRecipes[0].image);

    userEvent.click(drinkButton);
    const firstImageDrink = await screen.findByTestId(IMAGE_TESTID);

    await waitFor(() => expect(firstImageDrink).toHaveAttribute('src', doneRecipes[1].image));

    userEvent.click(allButton);
    expect(firstImageMeal).toHaveAttribute('src', doneRecipes[0].image);
    const imageDrink = await screen.findByTestId('0-horizontal-image');
    expect(imageDrink).toHaveAttribute('src', doneRecipes[0].image);
  });

  test('Testing Shared button', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });

    const firstName = screen.getByTestId(NAME_TESTID);
    expect(firstName).toBeInTheDocument();
    expect(firstName).toHaveTextContent(/Spicy/i);
  });
});
