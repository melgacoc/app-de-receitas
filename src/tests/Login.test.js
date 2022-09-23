import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const EMAIL_INPUT = 'email-input';
const PASS_INPUT = 'password-input';

describe('Testes da página de Login', () => {
  test('Testa se o caminho é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se os inputs são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.queryByTestId(EMAIL_INPUT);
    const passwordInput = screen.queryByTestId(PASS_INPUT);
    const buttonSubmit = screen.queryByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  test('Testa se o botão é desativado se os inputs estão vazios', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.queryByTestId(EMAIL_INPUT);
    const passwordInput = screen.queryByTestId(PASS_INPUT);
    const buttonSubmit = screen.queryByRole('button', { name: /enter/i });

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    expect(buttonSubmit).toBeDisabled();
  });

  // test('Testa o botão Enter', async () => {
  //   const { history } = renderWithRouterAndRedux(<App />);

  //   const buttonSubmit = screen.queryByRole('button', { name: /enter/i });
  //   expect(buttonSubmit).toBeDisabled();

  //   const emailInput = screen.queryByTestId(EMAIL_INPUT);
  //   const passwordInput = screen.queryByTestId(PASS_INPUT);

  //   userEvent.type(emailInput, 'teste@teste.com');
  //   userEvent.type(passwordInput, '12345678');
  //   expect(buttonSubmit).not.toBeDisabled();

  //   userEvent.click(buttonSubmit);
  //   await waitFor(() => expect(history.location.pathname).toBe('/meals'));
  // });
});
