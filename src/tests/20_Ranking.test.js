import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import player from '../redux/reducers/player';

const arr = [
  {
    "name": "marcs",
    "score": 140,
    "gravatar": "c84263576ded503be719edc743529d0e",
    "token": "27aa5b9b69aacf0d3d5a0c57dccd2d1ad58633dfc5f7fa31e2dfc0cb7e84f028"
  },
  {
    "name": "marcos",
    "score": 75,
    "gravatar": "68d4f86e18ff055f675b0719f44625cb",
    "token": "0ab01af4c9e9983d8ee3590d8e9542b069be7d391db3b05a8956f008b0fc9a41"
  }
];

const INITIAL_STATE = localStorage.setItem('Players', JSON.stringify(arr)); 

describe('testes para atingir 90% de cobertura da tela de Ranking', () => {
  test('verifica tela de ranking e titulo', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
   const title = screen.getByRole('heading', { name: /ranking/i });
   expect(title).toBeInTheDocument();
  });

  test('testa rota', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    expect(history.location.pathname).toBe('/ranking')
  })

  test('verifica se ten duas pessoas', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const names = screen.getAllByText('Name:');
    expect(names).toHaveLength(2)
    const gravatar = screen.getAllByRole('img', { name: /gravatar/i });
    expect(gravatar).toHaveLength(2)
    const scores = screen.getAllByText('Score:');
    expect(scores).toHaveLength(2)
  });

  test('testa botão play again volta para login', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    const button = screen.getByRole('button', { name: /play again/i });
    userEvent.click(button);
    expect(history.location.pathname).toBe('/')
  });

  test('verifica pessoas do ranking', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');

    const nameP1 = screen.getByText('marcs')
    expect(nameP1).toBeInTheDocument();
    const scoreP1 = screen.getByText('140');
    expect(scoreP1).toBeInTheDocument();

    const nameP2 = screen.getByText('marcos');
    expect(nameP2).toBeInTheDocument();
    const scoreP2 = screen.getByText('75');
    expect(scoreP2).toBeInTheDocument();
  });

  test('se esta em ordem', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');

    expect(screen.getAllByTestId(/player-name/i).length).toBe(2)
    expect(screen.getByTestId('player-name-0').innerHTML).toBe('marcs')
    expect(screen.getByTestId('player-name-1').innerHTML).toBe('marcos')
  })

  test('local storage vazio', () => {
    const arr2 = [];
    const INITIAL_STATE2 = localStorage.setItem('Player', JSON.stringify(arr2)); 
    localStorage.clear();
    renderWithRouterAndRedux(<App />, INITIAL_STATE2, '/ranking');

    const title = screen.getByRole('heading', { name: /ranking/i });
    expect(title).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /play again/i });
    expect(button).toBeInTheDocument();
    const semRanking = screen.getByText('Sem Ranking');
    expect(semRanking).toBeInTheDocument();
  })

  it('teste unitario', () => {
    const arrErro = [
      {
        "name": "teste3",
        "score": 140,
      },
      {
        "name": "marcos",
        "score": 275,
      },
      {
        "name": "marcs",
        "score": 40,
      },
      {
        "name": "test4",
        "score": 140,
      },
    ];
    const getLocalUni = arrErro;
    const menosUm = -1;
    if (getLocalUni) {
      getLocalUni.sort((a, b) => {
        if (b.score < a.score) return menosUm;
        if (b.score > a.score) return 1;
        return 0;
      });
    }
    expect(getLocalUni).toEqual([
      {
        "name": "marcos",
        "score": 275,
      },
      {
        "name": "teste3",
        "score": 140,
      },
      {
        "name": "test4",
        "score": 140,
      },
      {
        "name": "marcs",
        "score": 40,
      },
    ]);
  })

  it('teste unitario renderizando e usando sort do component', () => {
    const arrErro = [
      {
        "name": "teste3",
        "score": 140,
      },
      {
        "name": "marcos",
        "score": 275,
      },
      {
        "name": "marcs",
        "score": 40,
      },
      {
        "name": "test4",
        "score": 140,
      },
    ];
    
    const INITIAL_STATE3 = localStorage.setItem('Players', JSON.stringify(arrErro)); 
    
    renderWithRouterAndRedux(<App />, INITIAL_STATE3, '/ranking');
    
    expect(screen.getAllByTestId(/player-name/i).length).toBe(4)
  })
})


