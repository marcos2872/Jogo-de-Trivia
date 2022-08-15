import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { assertions, score } from '../redux/actions';
import { questionContainer, buttonGroup, question } from './question.module.scss';

const trinta = 30;
const mil = 1000;
const timeleft = { time: 30 };

function Question({ item, assertion, dispatchScore, setNext, options }) {
  const [color, setColor] = useState(false);
  const [time, setTime] = useState(trinta);
  const [disabledOp, setDisbledOp] = useState(false);

  function handleClick(correct) {
    if (correct) {
      dispatchScore(item.difficulty, time);
      assertion();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      timeleft.time -= 1;
      setTime(timeleft.time);
      if (timeleft.time === 0) {
        clearInterval(interval);
        timeleft.time = 30;
      }
    }, mil);
  }, []);

  useEffect(() => {
    if (time === 0) {
      setColor(true);
      setNext(true);
      setDisbledOp(true);
    }
  }, [time, setNext, setDisbledOp]);

  return (
    <section className={ questionContainer }>
      <h3 data-testid="question-category">{item.category}</h3>
      <p>{assertions}</p>
      <div className={ question }>
        <p data-testid="question-text">{item.question}</p>
      </div>
      <span data-testid="timer">{time}</span>
      <div data-testid="answer-options" className={ buttonGroup }>
        {options.map((it, i) => (
          <button
            type="button"
            key={ i }
            data-testid={ it.dataTest }
            style={ {
              border: color ? `${it.style}` : '',
            } }
            disabled={ disabledOp }
            onClick={ () => {
              setColor(true);
              setDisbledOp(true);
              setNext(true);
              handleClick(it.correct);
            } }
          >
            {it.title}
          </button>
        ))}
      </div>
    </section>
  );
}

Question.propTypes = {
  setNext: PropTypes.func.isRequired,
  assertion: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  item: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    dataTest: PropTypes.string,
    id: PropTypes.number,
    style: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  assertion: () => dispatch(assertions()),
  dispatchScore: (data, time) => dispatch(score(data, time)),
});

const mapStateToProps = (state) => ({
  timer0: state.player.timer === 0,
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
