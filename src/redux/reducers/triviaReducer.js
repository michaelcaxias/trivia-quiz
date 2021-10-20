import { REQUESTING_ENDPOINT, GET_JSON } from '../actions';

const initialState = {
  questions: [],
  isFetching: true,
  index: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case REQUESTING_ENDPOINT:
    return { ...state,
      isFetching: true,
    };
  case GET_JSON:
    return { ...state,
      questions: payload,
      isFetching: false,
    };
  default:
    return state;
  }
};
