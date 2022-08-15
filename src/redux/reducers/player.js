import { ASSERTIONS, NAMEGRAVATAR, SCORE, TIMER, CLEARPLAYER } from '../actions';

const initialState = {
  name: 'Nome',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: 30,
};

const dez = 10;
const player = (state = initialState, action) => {
  switch (action.type) {
  case NAMEGRAVATAR:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };

  case ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };

  case SCORE:
    return {
      ...state,
      score: state.score + (dez + action.payload),
    };

  case TIMER:
    return {
      ...state,
      timer: action.payload,
    };

  case CLEARPLAYER:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      timer: 30,
    };

  default:
    return state;
  }
};

export default player;
