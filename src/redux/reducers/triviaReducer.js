import { REQUESTING_ENDPOINT, GET_JSON, UPDATE_RANKING } from '../actions';

const initialState = {
  questions: [],
  ranking: [],
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
  case UPDATE_RANKING:
    return {
      ...state,
      ranking: [...state.ranking, payload],
    };
  default:
    return state;
  }
};
