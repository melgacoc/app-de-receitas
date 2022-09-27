import React from 'react';
import { waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
// import SearchBar from '../components/SearchBar';

// // const PAGE_TITLE_TESTID = 'page-title';
// // const SEARCH_INPUT_TESTID = 'search-input';
// // const HEADER_BUTTON_TESTID = 'search-top-btn';
// // const SEARCHBAR_BUTTON_TESTID = 'exec-search-btn';
// // const RADIO_FIRSTLETTER_TESTID = 'first-letter-search-radio';

describe('Testes do componente Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockReturnValue(mockData),
    });
  });

  // test('Se a searchBar não está visível ao entrar na rota meals', () => {
  //   renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

  //   const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
  //   const searchInput = screen.queryByTestId(SEARCH_INPUT_TESTID);

  //   expect(pageTitle).toBeInTheDocument();
  //   expect(pageTitle).toHaveTextContent(/meals/i);
  //   expect(searchInput).not.toBeInTheDocument();
  // });

  test('Se os cards são renderizados', async () => {
    const { findByTestId } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => expect(global.fetch).toBeCalled());

    const card = await findByTestId('0-recipe-card');

    expect(card).toBeInTheDocument();

    // const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    // const searchInput = screen.queryByTestId(SEARCH_INPUT_TESTID);

    // expect(pageTitle).toBeInTheDocument();
    // expect(pageTitle).toHaveTextContent(/drinks/i);
    // expect(searchInput).not.toBeInTheDocument();
  });
});
