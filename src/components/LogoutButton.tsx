import { Button } from '@material-ui/core';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
  logoutAsync,
} from '../features/auth/authSlice'

const LogoutButton: React.FunctionComponent<any> = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token')

  if (!token) {
    return <Redirect exact to="/login" />
  }

  return (
    <Button
      className="logout-button"
      variant="text"
      onClick={() => {
        if (token) {
          dispatch(logoutAsync(localStorage.getItem('token') as string))
        }
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
