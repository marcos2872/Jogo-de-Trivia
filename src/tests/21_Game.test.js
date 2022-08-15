import React from 'react';
import Game from "../pages/Game";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import { mockResponse } from './util/mockResponse.js'
import userEvent from '@testing-library/user-event';

describe('21. Desenvolva testes para atingir 90% de cobertura da tela de Jogo', () => {

  global.fetch = (url) => Promise.resolve({
    json: () => Promise.resolve(mockResponse)
  })
 
  const initialState = {
    player: {
      name: 'Teste',
      assertions: 0,
      score: 0,
      gravatarEmail: 'ce11fce876c93ed5d2a72da660496473',
      timer: 30,
    },
  };

  const initialStateERROR = {
    question: {
      questions: {
        "response_code": 3,
        "results": [],
      },
    },
  };
       
  it('Elementos por TestId', async () => {
    renderWithRouterAndRedux(<Game />, initialState);

    expect(await screen.findByTestId("question-category")).toBeInTheDocument();
    expect(await screen.findByTestId("question-text")).toBeInTheDocument();
    expect(await screen.findByTestId("answer-options")).toBeInTheDocument();
  }); 

  it('Todas perguntas, pontuação máxima resposta correta e botão next', async () => {
    renderWithRouterAndRedux(<Game />, initialState);

    const dez = 10;

    const level = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
  
    const maxScore = (
      (dez + (initialState.player.timer * level.medium)) + 
      (dez + (initialState.player.timer * level.easy)) + 
      (dez + (initialState.player.timer * level.easy)) + 
      (dez + (initialState.player.timer * level.easy)) + 
      (dez + (initialState.player.timer * level.hard))
    );

    const headerDetailName = screen.findByTestId('header-player-name');
    expect(await headerDetailName).toHaveTextContent('Teste');

    const headerDetailScore = screen.findByTestId('header-score');
    expect(await screen.findByText(/how many classes are there in team fortress 2/i)).toBeInTheDocument();
    expect(await headerDetailScore).toHaveTextContent(initialState.player.score);

    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(await headerDetailScore).toHaveTextContent('70');

    userEvent.click(await screen.findByTestId('btn-next'));
    expect(await screen.findByText(/on twitter, what was the original character limit for a tweet/i)).toBeInTheDocument();
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(await headerDetailScore).toHaveTextContent('110');
    
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(await screen.findByText(/which actor plays obi-wan kenobi in star wars episodes I-lll/i)).toBeInTheDocument();
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(await headerDetailScore).toHaveTextContent('150');
    
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(await screen.findByText(/which of these mythological creatures is said to be half-man and half-horse/i)).toBeInTheDocument();
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(await headerDetailScore).toHaveTextContent('190');
    
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(await screen.findByText(/Pete Townshend&#039;s solo album, &quot;White City: A Novel&quot;, is set in the metropolitan area of Chicago/i)).toBeInTheDocument();
    
    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(await screen.findByTestId('header-score')).toHaveTextContent(maxScore);
  });

  it('testa de vai para tela de feedback', async () => {
    const {history} = renderWithRouterAndRedux(<Game />, initialState);
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
    expect(history.location.pathname).toBe('/feedback');
  });
  it('testa de vai para tela login', async () => {
    const { history } = renderWithRouterAndRedux(<Game />, initialStateERROR);
    expect(history.location.pathname).toBe('/');
  });

  test('verifica botão', async () => {
    renderWithRouterAndRedux(<Game />, initialState);

    expect(await screen.findByRole('button', { name: /9/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /10/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /8/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /7/i })).toBeInTheDocument();
    userEvent.click(await screen.findByTestId('correct-answer'));
    userEvent.click(await screen.findByTestId('btn-next'));
  });
}) 