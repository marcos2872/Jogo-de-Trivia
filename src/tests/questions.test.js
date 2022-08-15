import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import Game from '../pages/Game'
import userEvent from '@testing-library/user-event';
import { mockResponse } from './util/mockResponse.js'

describe('timer', () => {

  global.fetch = (url) => Promise.resolve({
    json: () => Promise.resolve(mockResponse)
  })

  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  test('div do timer', async () => {
    renderWithRouterAndRedux(<Game />);    
    await waitFor(() => expect(screen.getByTestId('timer')).toBeInTheDocument());
  });

  test('desabilita botao quando o time zera', async () => {
    renderWithRouterAndRedux(<Game />);
    await waitFor(() => expect(screen.getByTestId('wrong-answer-0')).toBeDisabled(), { timeout: 3000 });
    await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeDisabled(), {timeout :3000});
    await waitFor(() => expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument(), { timeout: 3000 });
  });

  test('Verifica se a cor correta do botão é chamada', async () => {
    renderWithRouterAndRedux(<Game />);

    const correct = await screen.findByTestId('correct-answer')
    const worng = await screen.findByTestId('wrong-answer-0')
    userEvent.click(correct);

    expect(screen.getByTestId('correct-answer').getAttribute('style')).toMatch(
      'border: 3px solid rgb(6, 240, 15);',
    );

  expect(screen.getByTestId('wrong-answer-0').getAttribute('style')).toMatch(
      'border: 3px solid red;',
    );
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })
});
