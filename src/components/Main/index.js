import React, { useEffect, useContext } from 'react';
import { Context } from '../../store';
import { INITIALIZE_APP } from '../../store/constants';

export default function Wrapper({ children }) {
  const [_, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: INITIALIZE_APP });
  }, [dispatch]);

  return <>{children}</>;
}
