import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('1. Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  it('Testa se o input de nome e e-mail são renderizados', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/Digite seu nome/i);
    const inputEmail = screen.getByPlaceholderText(/Digite seu E-mail/i);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  it('Testa se o input de nome e e-mail são editáveis', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/Digite seu nome/i);
    userEvent.type(inputName, 'João');
    
    expect(inputName).toHaveValue('João');

    const inputEmail = screen.getByPlaceholderText(/Digite seu E-mail/i);
    userEvent.type(inputEmail, 'joao@gmail.com');

    expect(inputEmail).toHaveValue('joao@gmail.com');
  });

  it('Testa se o botão "Play" está desabilitado quando os campos de nome e e-mail estão vazios', () => {
    renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/Digite seu nome/i);
    expect(inputName).toHaveValue('');

    const inputEmail = screen.getByPlaceholderText(/Digite seu E-mail/i);
    expect(inputEmail).toHaveValue('');

    const playButton = screen.getByRole('button', { name: 'Play' });
    expect(playButton).toBeDisabled();
  });

  it('Testa se o botão "Play" direciona para a rota /game', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const inputName = screen.getByPlaceholderText(/Digite seu nome/i);
    userEvent.type(inputName, 'Samanta');
    expect(inputName).toHaveValue('Samanta');

    const inputEmail = screen.getByPlaceholderText(/Digite seu E-mail/i);
    userEvent.type(inputEmail, 'samanta@trybe.com');
    expect(inputEmail).toHaveValue('samanta@trybe.com');

    const playButton = screen.getByRole('button', { name: 'Play' });
    userEvent.click(playButton);

    await waitFor(() => { expect(history.location.pathname).toBe('/game')});
    
  });

  it('Testa se o botão "Settings" direciona para a rota /settings', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const settingsButton = screen.getByRole('button', { name: /settings/i })
    userEvent.click(settingsButton);

    await waitFor(() => { expect(history.location.pathname).toBe('/settings')});
  });
})