export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});
