import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { headerContainer, user } from './header.module.scss';

function HeaderGame(props) {
  const { headerDetail } = props;

  return (
    <header className={ headerContainer }>
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
      <p
        data-testid="header-score"
      >
        {`Score: ${headerDetail.score}`}
      </p>
    </header>
  );
}

HeaderGame.propTypes = {
  headerDetail: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  headerDetail: state.player,
});

export default connect(mapStateToProps)(HeaderGame);
