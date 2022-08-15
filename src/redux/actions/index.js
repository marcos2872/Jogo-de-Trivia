import md5 from 'crypto-js/md5';

export const TOKEN = 'TOKEN';
export const LOGOUT = 'logout';
export const NAMEGRAVATAR = 'nameGravatar';
export const QUESTION = 'question';
export const ASSERTIONS = 'assertions';
export const SCORE = 'score';
export const TIMER = 'timer';
export const CLEARPLAYER = 'clearPlayes';

const requestToken = (payload) => ({
  type: TOKEN,
  payload,
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload,
});

const saveQuestions = (payload) => ({
  type: QUESTION,
  payload,
});

export const fetchQuestion = (token) => async (dispatch) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  dispatch(saveQuestions(data));
};

export const fetchToken = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  localStorage.setItem('token', data.token);
  dispatch(requestToken(data.token));
};

export const saveNameGravatar = (payload) => ({
  type: NAMEGRAVATAR,
  name: payload.name,
  gravatarEmail: md5(payload.email).toString(),
});

export const assertions = (payload) => ({
  type: ASSERTIONS,
  payload,
});

const level = {
  hard: 3,
  medium: 2,
  easy: 1,
};

export const score = (payload, time) => {
  if (payload === 'easy') {
    return {
      type: SCORE,
      payload: level.easy * time,
    };
  }
  if (payload === 'medium') {
    return {
      type: SCORE,
      payload: level.medium * time,
    };
  }
  return {
    type: SCORE,
    payload: level.hard * time,
  };
};

export const timer = (payload) => ({
  type: TIMER,
  payload,
});

export const clearPlayes = () => ({
  type: CLEARPLAYER,
});
