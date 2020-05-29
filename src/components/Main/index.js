import React, { useEffect, useContext } from 'react';
import { Context } from '../../store';

export default function Wrapper({ children }) {
  const [state] = useContext(Context);

  useEffect(() => {
    localStorage.setItem('__swvl__', JSON.stringify(state));
  }, [state]);

  return <>{children}</>;
}
