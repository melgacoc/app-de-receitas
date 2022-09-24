import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Meals from '../pages/Meals';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASS_INPUT = 'password-input';
const EMAIL_TEST = 'teste@teste.com';
const PASS_TEST = '12345678';

describe('Header Test', () => {
  test('Testing initial path on Meals', () => {
    renderWithRouterAndRedux(<App />);

    const buttonSubmit = screen.queryByRole('button', { name: /enter/i });
    expect(buttonSubmit).toBeDisabled();

    userEvent.type(screen.queryByTestId(EMAIL_INPUT), EMAIL_TEST);
    userEvent.type(screen.queryByTestId(PASS_INPUT), PASS_TEST);
    expect(buttonSubmit).not.toBeDisabled();

    userEvent.click(buttonSubmit);
  });

  test('Testing Header itens', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    const drinks = screen.getByTestId('drinks-bottom-btn');
    const meals = screen.getByTestId('meals-bottom-btn');

    expect(drinks).toBeInTheDocument();
    expect(meals).toBeInTheDocument();

    userEvent.click(drinks);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Testing Header button drink', () => {
    const { history } = renderWithRouterAndRedux(<Meals />);
    const meals = screen.getByTestId('meals-bottom-btn');

    userEvent.click(meals);

    expect(history.location.pathname).toBe('/meals');
  });
});
