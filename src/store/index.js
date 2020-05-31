import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import initialState from './initialState';

export const Context = createContext(initialState);

const Store = ({ children }) => {
  const localState = JSON.parse(
    localStorage.getItem(process.env.REACT_APP_CACHE_KEY),
  );
  const [state, dispatch] = useReducer(reducer, localState || initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Store;
