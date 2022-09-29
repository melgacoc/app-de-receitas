import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import details from './helpers/mockDrinkDetails';

const IN_PROGRESS_PATHNAME = '/drinks/13332/in-progress';

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

    const frtIngredient = await screen.findByTestId('0-ingredient-step');
    const scdIngredient = await screen.findByTestId('1-ingredient-step');
    const trdIngredient = await screen.findByTestId('2-ingredient-step');
    await waitFor(() => expect(frtIngredient).toBeInTheDocument());
    await waitFor(() => expect(scdIngredient).toBeInTheDocument());
    await waitFor(() => expect(trdIngredient).toBeInTheDocument());

    const instructions = await screen.findByTestId('instructions');
    await waitFor(() => expect(instructions).toBeInTheDocument());

    const photo = await screen.findByTestId('recipe-photo');
    await waitFor(() => expect(photo).toBeInTheDocument());

    const title = await screen.findByTestId('recipe-title');
    await waitFor(() => expect(title).toBeInTheDocument());

    const share = await screen.findByTestId('share-btn');
    await waitFor(() => expect(share).toBeInTheDocument());

    const favorite = await screen.findByTestId('favorite-btn');
    await waitFor(() => expect(favorite).toBeInTheDocument());

    const category = await screen.findByTestId('recipe-category');
    await waitFor(() => expect(category).toBeInTheDocument());

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    await waitFor(() => expect(finishBtn).toBeInTheDocument());
  });
  test('Se a página é renderizada corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME] });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(details),
    });

    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    await waitFor(() => expect(finishBtn).toBeDisabled());

    const frtIngredient = await screen.findByTestId('0-ingredient-step');
    const scdIngredient = await screen.findByTestId('1-ingredient-step');
    const trdIngredient = await screen.findByTestId('2-ingredient-step');
    await waitFor(() => expect(frtIngredient).toBeInTheDocument());
    await waitFor(() => expect(scdIngredient).toBeInTheDocument());
    await waitFor(() => expect(trdIngredient).toBeInTheDocument());
    userEvent.click(frtIngredient);
    userEvent.click(scdIngredient);
    userEvent.click(trdIngredient);

    await waitFor(() => userEvent.click(finishBtn));
  });
  test('Se ao clicar no botão de Share, copia a url ', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [IN_PROGRESS_PATHNAME] });

    // window.document.execCommand = jest.fn().mockImplementation(() => 'Link copied!');

    const shareBtn = screen.getByTestId('share-btn');

    userEvent.click(shareBtn);

    const copiedLink = await screen.getByText('Link copied!');
    waitFor(() => expect(copiedLink).toBeInTheDocument);
  });
});
