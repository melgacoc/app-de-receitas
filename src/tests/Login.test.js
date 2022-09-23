import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const EMAIL_INPUT = 'email-input';
const PASS_INPUT = 'password-input';
const EMAIL_TEST = 'teste@teste.com';
const PASS_TEST = '12345678';

describe('Testes da página de Login', () => {
  test('Testa se o caminho inicial é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se os inputs são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.queryByTestId(EMAIL_INPUT);
    const passwordInput = screen.queryByTestId(PASS_INPUT);
    const buttonSubmit = screen.queryByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  test('Testa se o botão é desativado com os inputs vazios', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.queryByTestId(EMAIL_INPUT);
    const passwordInput = screen.queryByTestId(PASS_INPUT);
    const buttonSubmit = screen.queryByRole('button', { name: /enter/i });

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    expect(buttonSubmit).toBeDisabled();
  });

  test('Testa se ao clicar no botão, o usuário é redirecionado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonSubmit = screen.queryByRole('button', { name: /enter/i });
    expect(buttonSubmit).toBeDisabled();

    userEvent.type(screen.queryByTestId(EMAIL_INPUT), EMAIL_TEST);
    userEvent.type(screen.queryByTestId(PASS_INPUT), PASS_TEST);
    expect(buttonSubmit).not.toBeDisabled();

    userEvent.click(buttonSubmit);
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
  });
});
