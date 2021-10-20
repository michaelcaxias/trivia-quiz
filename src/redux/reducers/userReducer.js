import { GET_NAME, GET_EMAIL } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_NAME:
    return { ...state,
      name: payload,
    };
  case GET_EMAIL:
    return { ...state,
      gravatarEmail: payload,
    };

  default:
    return state;
  }
};
