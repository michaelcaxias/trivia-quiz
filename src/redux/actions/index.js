export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const REQUESTING_ENDPOINT = 'REQUESTING_ENDPOINT';
export const GET_JSON = 'GET_JSON';
export const GET_PLAYER = 'GET_PLAYER';

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const requestingEndpoint = () => ({
  type: REQUESTING_ENDPOINT,
});

export const getJson = (payload) => ({
  type: GET_JSON,
  payload,
});

export const sendInfosPlayer = (payload) => ({
  type: GET_PLAYER,
  payload,
});

export const fetchTrivia = (token) => async (dispatch) => {
  dispatch(requestingEndpoint());
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const resolve = await request.json();
  dispatch(getJson(resolve.results));
};
