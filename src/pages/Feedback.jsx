import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearPlayes, logout } from '../redux/actions';
import {
  container,
  user,
  score,
  feedBetter,
  feedDone,
  questionFeed,
  play,
  ranking,
  buttonGroup } from './feedback.module.scss';

const tres = 3;
// const menosUm = -1;
function Feedback({ headerDetail, login, token, clearPlayer }) {
  const [redirectLogin, setRedirectLogin] = useState(false);
  const history = useHistory();

  function savePlayer() {
    const getLocal = JSON.parse(localStorage.getItem('Players'));
    const player = {
      name: headerDetail.name,
      score: headerDetail.score,
      gravatar: headerDetail.gravatarEmail,
      token: token.token,
    };
    const arrPlayes = [...(getLocal || []), player];
    // arrPlayes.sort((a, b) => {
    //   if (b.score < a.score) return menosUm;
    //   if (b.score > a.score) return 1;
    //   return 0;
    // });
    localStorage.setItem('Players', JSON.stringify(arrPlayes));
    clearPlayer();
  }

  return (
    <main className={ container }>

      <header>
        { redirectLogin && history.push('/') }
        <div className={ user }>

          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${headerDetail.gravatarEmail}` }
            alt="Gravatar"
            width="40px"
          />
          <h3
            data-testid="header-player-name"
          >
            {headerDetail.name}
          </h3>
        </div>
        <section data-testid="feedback-total-score">
          <p
            data-testid="header-score"
            className={ score }
          >
            {Number(headerDetail.score)}
          </p>
        </section>
      </header>
      <section data-testid="feedback-total-question" className={ questionFeed }>
        <p
          data-testid="header-assertions"
        >
          {Number(headerDetail.assertions)}
        </p>
        {headerDetail.assertions < tres && (
          <p data-testid="feedback-text" className={ feedBetter }>Could be better...</p>
        )}
        {headerDetail.assertions >= tres && (
          <p data-testid="feedback-text" className={ feedDone }>Well Done!</p>
        )}
      </section>
      <section className={ buttonGroup }>

        <button
          className={ play }
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            savePlayer();
            login();
            setRedirectLogin(true);
          } }
        >
          Play Again
        </button>
        <button
          className={ ranking }
          data-testid="btn-ranking"
          type="button"
          onClick={ () => {
            savePlayer();
            login();
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
      </section>
    </main>
  );
}

Feedback.propTypes = {
  headerDetail: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }),
  login: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  headerDetail: state.player,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(logout()),
  clearPlayer: () => dispatch(clearPlayes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
