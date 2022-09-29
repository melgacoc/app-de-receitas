import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import mockLocalStorage from './helpers/mockLocalStorage';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('FavoriteRecipes page', () => {
  beforeEach(() => {
  // const mock = mockLocalStorage();
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
  });
  // test.only('', () =>{
  // renderWithRouterAndRedux(<FavoriteRecipes />);
  // const a = localStorage.getItem('favoriteRecipes');
  // console.log(a);
  // });

  test('Verify if recipe titles are rendered', () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const mealTitle = screen.getByTestId('0-horizontal-name');
    expect(mealTitle).toBeInTheDocument();
    const drinkTitle = screen.getByTestId('1-horizontal-name');
    expect(drinkTitle).toBeInTheDocument();
  });

  // test('', async () => {
  //   renderWithRouterAndRedux(<FavoriteRecipes />);

  //   const favButton = screen.getByTestId('0-horizontal-favorite-btn');
  //   expect(favButton).toBeInTheDocument();

  //   userEvent.click(favButton);

  //   const mealTitle = await screen.findByText(/spicy/i);
  //   await waitForElementToBeRemoved(() => mealTitle);
  // });

  test('If the filter buttons work correctly', () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);

    const drink = screen.getByTestId('0-horizontal-name');
    expect(drink).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /meals/i }));
    expect(drink).not.toBeInTheDocument();
  });
});
