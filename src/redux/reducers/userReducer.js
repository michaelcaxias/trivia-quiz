import { GET_NAME, GET_EMAIL, GET_PLAYER } from '../actions';

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
  case GET_PLAYER:
    return {
      ...payload,
    };

  default:
    return state;
  }
};
