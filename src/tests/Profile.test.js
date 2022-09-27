import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testes da pagina Profile', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'usuario@gmail.com' }));
  });

  test('Se ao carregar a pagina o email do storage aparece na tela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const emailStoragedOnScreen = await screen.getByTestId('profile-email');
    expect(emailStoragedOnScreen).toHaveTextContent('Your email: usuario@gmail.com');
  });

  test('Se ao clicar no botão done recipes ele vai para a rota done recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    expect(doneRecipesButton).toBeInTheDocument();

    userEvent.click(doneRecipesButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Se ao clicar no botão done recipes ele vai para a rota Favorite Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const doneRecipesButton = screen.getByTestId('profile-favorite-btn');
    expect(doneRecipesButton).toBeInTheDocument();

    userEvent.click(doneRecipesButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Se ao clicar no botão done recipes ele vai para a rota Favorite Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });

    const doneRecipesButton = screen.getByTestId('profile-logout-btn');
    expect(doneRecipesButton).toBeInTheDocument();

    userEvent.click(doneRecipesButton);

    expect(history.location.pathname).toBe('/');
  });
});
