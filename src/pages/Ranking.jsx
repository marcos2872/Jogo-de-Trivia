import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions';
import { container, tableScore, tdName, headerContainer } from './ranking.module.scss';

const menosUm = -1;
function Ranking({ logoutLigin }) {
  const [players, setPlayers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('Players'));
    if (getLocal) {
      getLocal.sort((a, b) => {
        if (b.score < a.score) return menosUm;
        if (b.score > a.score) return 1;
        return 0;
      });
      setPlayers(getLocal);
    }
  }, []);

  return (
    <main className={ container }>
      <header className={ headerContainer }>

        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            logoutLigin();
            history.push('/');
          } }
        >
          Play Again
        </button>
      </header>
      <table className={ tableScore }>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Score</th>
            <th>Inicio</th>
          </tr>
        </thead>
        <tbody>
          {players.length > 0 && players.map((item, index) => (
            <tr key={ index }>
              <td>
                <div className={ tdName }>
                  <img
                    data-testid="header-profile-picture"
                    src={ `https://www.gravatar.com/avatar/${item.gravatar}` }
                    alt="Gravatar"
                    width="40px"
                  />
                  <p data-testid={ `player-name-${index}` }>
                    {item.name}
                  </p>

                </div>
              </td>
              <td data-testid={ `player-score-${index}` }>
                { item.score }
              </td>
              <td>5minutos</td>
            </tr>
          )) }
        </tbody>
      </table>
    </main>

  );
}

Ranking.propTypes = {
  logoutLigin: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  logoutLigin: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(Ranking);
