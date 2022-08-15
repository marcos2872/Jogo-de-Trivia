import { QUESTION } from '../actions';

const initialState = {
  questions: {},
};

const question = (state = initialState, action) => {
  switch (action.type) {
  case QUESTION:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default question;
