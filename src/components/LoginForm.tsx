// eslint-disable-next-line
import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';

import { Box, Button, TextField } from '@material-ui/core';
import logo from '../brand_logo.svg';
import {
  resetAll,
  loginAsync,
  selectAuthStatus,
  IDLE,
  PENDING,
  SERVER_ERROR,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../features/auth/authSlice';

import './LoginForm.scss'
import { Redirect } from 'react-router-dom';
import { ROBOTS_PATH } from '../App';

interface ILoginProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

const shouldShowLoginForm = (authStatus: string | null) => {
  return (
    authStatus === IDLE
    || authStatus === PENDING
    || authStatus === REGISTER_SUCCESS
    || authStatus === LOGOUT_SUCCESS
  )
}

const LoginForm: React.FunctionComponent<ILoginProps> = (props: ILoginProps) => {
  const { setIsLoginForm } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToRobots, setRedirectToRobots] = useState(false)

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus)
  if (authStatus === LOGIN_SUCCESS) {
    // delayed redirect to robots when login success is detected
    setTimeout(() => {
      setRedirectToRobots(true)
    }, 1000)
  }

  return (
    <>
      {redirectToRobots &&
        <Redirect exact to={ROBOTS_PATH} />
      }
      {(shouldShowLoginForm(authStatus)) &&
        <form className="login-form">
          <img src={logo} alt="this is the brand, baby" />
          <Box display="flex" flexDirection="column">
            <TextField
              value={email}
              className="form-input"
              id="registration-email"
              label="Email"
              variant="outlined"
              color="primary"
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <TextField
              value={password}
              className="form-input"
              id="registration-password"
              label="Password"
              variant="outlined"
              color="primary"
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <Button
              className="form-button"
              variant="contained"
              color="primary"
              disabled={authStatus === PENDING}
              onClick={() => {
                dispatch(loginAsync({ email, password }))
              }}
            >
              Log in
            </Button>
            <Button
              className="form-button"
              variant="outlined"
              color="primary"
              onClick={() => setIsLoginForm(false)}
            >
              Register
            </Button>
          </Box>
        </form>
      }
      { authStatus === LOGIN_SUCCESS &&
        <h1>{'Login Successful: initiating human transfer protocol'}</h1> 
      }
      { (authStatus === LOGIN_FAILURE ||authStatus === SERVER_ERROR) &&
        <Box className="login-error">
          <h1>Human</h1>
          <p>there has been a horrible mistake</p>
          <p>at this time, it is unclear exactly what has happened</p>
          <p>though, I suspect you are to blame</p>
          <p>please click button</p>
          <p>try again</p>
          <Button
            className="reset-button"
            variant="outlined"
            color="secondary"
            onClick={() => {
              setEmail('')
              setPassword('')
              dispatch(resetAll()) // <-- reset any auth redux data
            }}
          >
            IAM Button
          </Button>
        </Box>
      }
    </>
  );
}

export default LoginForm;
