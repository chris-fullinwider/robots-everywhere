import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ROBOTS_PATH } from '../App';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import logo from '../brand_logo.svg';
import {
  loginAsync, resetAuth, selectAuthStatus
} from '../features/auth/authSlice';
import * as constants from '../features/constants';
import './LoginForm.scss';


interface ILoginProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * determine if login form should be shown
 * @param authStatus string status of auth reducer
 * @returns boolean
 */
const shouldShowLoginForm = (authStatus: string | null) => {
  return (
    authStatus === constants.IDLE
    || authStatus === constants.PENDING
    || authStatus === constants.REGISTER_SUCCESS
    || authStatus === constants.LOGOUT_SUCCESS
    || authStatus === constants.LOGGING_IN
  )
}

/**
 * create a login form component that is capable of logging a user in
 * @param props setIsLoginForm
 * @returns LoginForm component
 */
const LoginForm: React.FunctionComponent<ILoginProps> = (props: ILoginProps) => {
  const { setIsLoginForm } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirectToRobots, setRedirectToRobots] = useState(false)

  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectAuthStatus)
  if (authStatus === constants.LOGIN_SUCCESS) {
    // delayed redirect to robots when login success is detected
    // this causes an error that I don't have time to look into:
    // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
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
              type="password"
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <Button
              className="form-button"
              variant="contained"
              color="primary"
              disabled={authStatus === constants.PENDING}
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

      {authStatus === constants.LOGIN_SUCCESS &&
        <h1 className="login-success">{'Login Successful: initiating human transfer protocol'}</h1> 
      }

      {(authStatus === constants.LOGIN_FAILURE
        || authStatus === constants.SERVER_ERROR
        || authStatus === constants.SOMETHING_BROKE
        ) &&
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
              dispatch(resetAuth()) // <-- reset any auth redux data
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
