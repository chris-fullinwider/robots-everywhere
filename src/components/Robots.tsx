import React from 'react';
import { Redirect } from 'react-router-dom';
import { LOGIN_PATH } from '../App';
import { useAppSelector } from '../app/hooks';
import { LOGOUT_SUCCESS, selectAuthStatus } from '../features/auth/authSlice';

const Robots: React.FunctionComponent<any> = () => {

  const authStatus = useAppSelector(selectAuthStatus)
  return (
    <>
      {authStatus === LOGOUT_SUCCESS &&
        <Redirect exact to={LOGIN_PATH} />
      }
      <h1>check out dem Robots</h1>
    </>
  );
}

export default Robots;
