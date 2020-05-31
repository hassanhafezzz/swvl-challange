import React, { useEffect, useContext } from 'react';
import { Context } from '../../store';

export default function Wrapper({ children }) {
  const [state] = useContext(Context);

  useEffect(() => {
    localStorage.setItem(
      process.env.REACT_APP_CACHE_KEY,
      JSON.stringify(state),
    );
  }, [state]);

  return <main role="main">{children}</main>;
}
