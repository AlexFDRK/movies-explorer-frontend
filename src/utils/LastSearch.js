import { KEY, TURN } from './constants';

export const updateSearch = (value) => {
  localStorage.setItem(KEY, value);
};

export const getSearch = () => localStorage.getItem(KEY);

export const removeSearch = () => {
  localStorage.removeItem(KEY);
};

export const updateTurn = (value) => {
  localStorage.setItem(TURN, value);
};

export const getTurn = () => localStorage.getItem(TURN);

export const removeTurn = () => {
  localStorage.removeItem(TURN);
};
