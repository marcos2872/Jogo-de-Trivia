import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';

// // Feedback Items
const feedbackName = 'header-player-name';
const score = 'header-score';
const assertions = 'header-assertions';

// Feedback Items
const gravatar = 'header-profile-picture';

const INITIAL_STATE = {
  player: {
    name: 'Harumi',
    assertions: 4,
    score: 300,
    gravatarEmail: '',
  },
};

const INITIAL_STATE2 = {
  player: {
    name: 'Harumi',
    assertions: 2,
    score: 100,
  },
};

describe('1. Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks', () => {
  describe('a. Verificações no header', () => {
    it('Verifica se a imagem do Gravatar está presente no header', () => {
      renderWithRouterAndRedux(<Feedback />);

      expect(screen.getByTestId(gravatar)).toBeInTheDocument();
    });

    it('Verifica se o nome da pessoa está presente no header', () => {
      renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

      expect(screen.getByTestId(feedbackName)).toBeInTheDocument();
      expect(screen.getByTestId(feedbackName)).toHaveTextContent('Harumi');
    });

    it('Verifica se o placar com o valor atual está presente no header', () => {
      renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

      expect(screen.getByTestId(score)).toBeInTheDocument();
      expect(screen.getByTestId(score)).toHaveTextContent('300');
    });

    it('Verifica se os acertos com os valores atuais estão presentes no header', () => {
      renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

      expect(screen.getByTestId(assertions)).toBeInTheDocument();
      expect(screen.getByTestId(assertions)).toHaveTextContent('4');
    });
    
    it('Verifica se os componentes estão renderizados na tela', () => {
      renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

      const feedbackMensage = screen.getByTestId('feedback-text');
      expect(feedbackMensage).toBeInTheDocument();

      const feedbackScore = screen.getByTestId('feedback-total-score');
      expect(feedbackScore).toBeInTheDocument();

      const feedbackAssertions = screen.getByTestId('feedback-total-question');
      expect(feedbackAssertions).toBeInTheDocument();

      const btnPlayAgain = screen.getByTestId('btn-play-again');
      expect(btnPlayAgain).toBeInTheDocument();

      const btnRanking = screen.getByTestId('btn-ranking');
      expect(btnRanking).toBeInTheDocument();
    });
  });

  describe('b. Verificações nas mensagens de Feedback', () => {
    it('Verifica se mensagem "Could be better..." é exibida caso a pessoa acerte menos de 3 perguntas', () => {
      renderWithRouterAndRedux(<Feedback />, INITIAL_STATE2);
      
      const feedbackMessage = screen.getByTestId('feedback-text');
      const message = 'Could be better...';

      expect(feedbackMessage).toHaveTextContent(message);
    });

    it('Verifica se a mensagem "Well Done!" é exibida caso a pessoa acerte 3 perguntas ou mais', () => {
      renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

      const feedbackMessage = screen.getByTestId('feedback-text');
      const message = 'Well Done!';

      expect(feedbackMessage).toHaveTextContent(message);
    });
  });

  describe('c. Verificações nas informações relacionadas aos resultados obtidos para a pessoa usuária', () => {
    it('O placar final deve ser renderizado', () => {
      renderWithRouterAndRedux(<Feedback />);

      const finalScore = screen.getByTestId('feedback-total-score');

      expect(finalScore).toBeInTheDocument();
    });

    it('O número de perguntas que a pessoa acertou deve ser renderizado', () => {
      renderWithRouterAndRedux(<Feedback />);

      const assertions = screen.getByTestId('feedback-total-question');
      
      expect(assertions).toBeInTheDocument();
    });
  });

  describe('d. Verifica se o player é redirecionado', () => {
    it('Ao clicar no botão "Play Again", a pessoa deve ser redirecionada para a tela de início (login)', () => {
      const { history } = renderWithRouterAndRedux(<Feedback />);

      const playAgainButton = screen.getByTestId('btn-play-again');
      expect(playAgainButton).toBeInTheDocument();

      userEvent.click(playAgainButton);

      expect(history.location.pathname).toBe('/');
    });

    it('Ao clicar no botão "Ranking", a pessoa deve ser redirecionada para a tela de Ranking', () => {
      const { history } = renderWithRouterAndRedux(<Feedback />);

      const rankingButton = screen.getByTestId('btn-ranking');
      expect(rankingButton).toBeInTheDocument();
      
      userEvent.click(rankingButton);

      expect(history.location.pathname).toBe('/ranking')
    });
  })
})