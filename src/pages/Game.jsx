import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import HeaderGame from '../components/HeaderGame';
import Question from '../components/Question';
import { container, next } from './game.module.scss';
import { fetchQuestion, logout, timer } from '../redux/actions';

const tres = 3;
const trinta = 30;
const quatro = 4;
const num = 0.5;

function Game({ getQuestions, tokenApi, questions, loginRedirect, getimer }) {
  const [index, setIndex] = useState(0);
  const [btnNext, setBtnNext] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getQuestions(tokenApi);
  }, [getQuestions, tokenApi]);

  const logoutLogin = () => {
    loginRedirect();
    history.push('/');
  };

  const sortOptions = (i) => {
    const quention = questions.results[i];
    const optC = {
      title: quention.correct_answer,
      style: '3px solid rgb(6, 240, 15)',
      dataTest: 'correct-answer',
      correct: true,
    };
    const optE = quention.incorrect_answers.map((item, idx) => ({
      id: idx,
      title: item,
      style: '3px solid red',
      dataTest: `wrong-answer-${idx}`,
      correct: false,
    }));
    return [optC, ...optE].sort(() => Math.random() - num);
  };

  return (
    <main className={ container }>
      {index > quatro && history.push('/feedback')}
      {questions.response_code === tres && logoutLogin()}
      <HeaderGame />
      {questions.results && questions.results.map((item, i) => (
        <Question
          key={ i }
          item={ item }
          options={ sortOptions(i) }
          setNext={ (value) => setBtnNext(value) }
        />))[index]}
      <div className={ next }>
        { btnNext && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              setIndex(index + 1);
              getimer();
              setBtnNext(false);
            } }
          >
            Next
          </button>)}
      </div>
    </main>
  );
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  loginRedirect: PropTypes.func.isRequired,
  tokenApi: PropTypes.string.isRequired,
  questions: PropTypes.shape().isRequired,
  getimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tokenApi: state.token.token,
  questions: state.question.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestion(token)),
  loginRedirect: () => dispatch(logout()),
  getimer: () => dispatch(timer(trinta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
