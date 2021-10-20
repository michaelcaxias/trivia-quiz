import { GET_NAME, GET_EMAIL } from '../actions';

const initialState = {
  name: '',
  email: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_NAME:
    return { ...state,
      name: payload,
    };
  case GET_EMAIL:
    return { ...state,
      email: payload,
    };

  default:
    return state;
  }
};
