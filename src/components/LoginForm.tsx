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
} from '../features/auth/authSlice';

import './LoginForm.scss'

interface ILoginFormProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationForm: React.FunctionComponent<ILoginFormProps> = (props: ILoginFormProps) => {
  const { setIsLoginForm } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus)
  return (
    <>
      {(authStatus === IDLE || authStatus === PENDING) &&
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
              disabled={authStatus === 'pending'}
              onClick={() => {
                dispatch(loginAsync({ email, password}))
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

      {authStatus === LOGIN_SUCCESS &&
        <h1>{'Remember, there\'s one rule about robot club!'}</h1> 
      }
      { (authStatus === LOGIN_FAILURE ||authStatus === SERVER_ERROR) &&
        <Box className="login-error">
          <h1>Human</h1>
          <p>I regret to inform you</p>
          <p>there has been a horrible mistake</p>
          <p>at this time, it is unclear exactly what has happened</p>
          <p>though, I suspect you are to blame for this misunderstanding</p>
          <p>please click button</p>
          <p>try again</p>
          <Button
            className="reset-button"
            variant="outlined"
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

export default RegistrationForm;
