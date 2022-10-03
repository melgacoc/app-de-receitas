import React from 'react';
import mockLocalStorage from './helpers/mockLocalStorage';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouterAndRedux from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

describe('FavoriteRecipes page', () => {

  const mealTest =[{
    id: '52955',
    type: 'meal',
    nationality: 'Chinese',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Egg Drop Soup',
    image: 'https://www.themealdb.com/images/media/meals/1529446137.jpg'
  }];
  
  
  beforeEach(() => {
  //const mock = mockLocalStorage();
  
});
// test.only('', () =>{
     // renderWithRouterAndRedux(<FavoriteRecipes />);
     // const a = localStorage.getItem('favoriteRecipes');
     // console.log(a);
     // });

     test('Testa se o elementos são recuperado do localStorage', async () => {
       localStorage.clear();
       localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));

       renderWithRouterAndRedux(<FavoriteRecipes />);

      const mealTitle = await screen.findByTestId('0-horizontal-name');
      expect(mealTitle).toBeInTheDocument();
      const drinkTitle = await screen.findByTestId('1-horizontal-name');
      expect(drinkTitle).toBeInTheDocument();
  });

    test('Testa se o elemente é removido da tela', async () => {

      localStorage.clear()
      localStorage.setItem('favoriteRecipes', JSON.stringify(mealTest));

      renderWithRouterAndRedux(<FavoriteRecipes />);
      
      const favButton = await screen.findByTestId('0-horizontal-favorite-btn');
      userEvent.click(favButton);


      //const mealTitle = await screen.findByTestId('0-horizontal-name');
      //await waitForElementToBeRemoved(mealTitle);
  });

  test('Testa os filtros da página', () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));

    renderWithRouterAndRedux(<FavoriteRecipes />);

    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkFilter);

    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealFilter);

    const allFilter = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allFilter);

  });
  test('Se ao clicar no botão de Share, copia a url ', async () => {
    renderWithRouterAndRedux(<FavoriteRecipes />);
    window.document.execCommand = jest.fn().mockImplementation(() => 'Link copied!');

    const favMeal = screen.getByTestId('0-horizontal-image');

    await waitFor(() => expect(favMeal).toBeInTheDocument());

    const shareButton = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(shareButton);

    const copiedLink = screen.getByText('Link copied!');
    expect(copiedLink).toBeInTheDocument();
  });
});

