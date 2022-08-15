import { TOKEN, LOGOUT } from '../actions';

const initialState = {
  token: '',
  redirect: false,
};

const token = (state = initialState, action) => {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      token: action.payload,
      redirect: true,
    };
  case LOGOUT:
    return {
      ...state,
      token: '',
      redirect: false,
    };
  default:
    return state;
  }
};

export default token;
