import React, { useEffect, useContext } from 'react';
import { Context } from '../../store';
import { initializeApp } from '../../store/actions';

export default function Wrapper({ children }) {
  const [_, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return <>{children}</>;
}
