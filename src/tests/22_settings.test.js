import React from 'react';
import Settings from "../pages/Settings";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';

describe('21. Desenvolva testes para atingir 90% de cobertura da tela de Jogo', () => {

  it('Elementos por TestId', () => {
    renderWithRouterAndRedux(<Settings />);

    expect(screen.getByTestId("settings-title")).toBeInTheDocument();

  });
});