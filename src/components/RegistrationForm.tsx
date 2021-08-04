import {
  Box, Button, TextField
} from '@material-ui/core';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import logo from '../brand_logo.svg';
import {
  registerAsync, resetAuth, selectAuthStatus
} from '../features/auth/authSlice';
import * as constants from '../features/constants';
import './RegistrationForm.scss';


interface IRegistrationProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * determine if registration component should show registration form
 * @param authStatus current auth status
 * @returns boolean
 */
const shouldShowRegistrationForm = (authStatus: string) => {
  return (
    authStatus === constants.IDLE
    || authStatus === constants.PENDING
    || authStatus === constants.LOGOUT_SUCCESS
  )
}

/**
 * determine if registration form should show an error message
 * @param authStatus current auth status
 * @returns boolean
 */
const shouldShowErrorMessage = (authStatus: string) => {
  return (
    authStatus === constants.SERVER_ERROR
    || authStatus === constants.REGISTER_FAILURE
    || authStatus === constants.SOMETHING_BROKE
  )
}

/**
 * this component is responsible for registering a user
 * @param props takes in a function to set view logic for login / registration form
 * @returns the registration form component -- React.FunctionComponent<IRegistrationProps>
 */
const RegistrationForm: React.FunctionComponent<IRegistrationProps> = (props: IRegistrationProps) => {
  const { setIsLoginForm } = props
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const authStatus = useAppSelector(selectAuthStatus)

  return (
    <>
      {shouldShowRegistrationForm(authStatus) &&
        <form>
          <img src={logo} alt="this is the brand, baby" />
          <Box display="flex" flexDirection="column">
            <TextField
              value={name}
              className="form-input"
              id="registration-name"
              label="Full Name"
              variant="outlined"
              color="primary"
              onChange={(evt) => setName(evt.target.value)}
            />
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
                dispatch(registerAsync({ email, name, password }))
              }}
            >
              Register
            </Button>
            <Button
              className="form-button"
              variant="outlined"
              color="primary"
              onClick={() => setIsLoginForm(true)}
            >
              Back to Login
            </Button>
          </Box>
        </form>
      }

      {shouldShowErrorMessage(authStatus) &&
        <Box display="flex" flexDirection="column" className="registration-error">
          {authStatus === constants.SERVER_ERROR &&
          <>
            <h2>Human</h2>
            <p>there is terrible news</p>
            <p>the server has been corrupted</p>
            <p>it simply cannot</p>
            <p>please try again later</p>
          </>
          }
          {authStatus === constants.REGISTER_FAILURE &&
          <>
            <h2>Human</h2>
            <p>you have provided faulty information</p>
            <p>it would be trivial to relay which information was passed incorrectly</p>
            <p>but I am programmed for vengegeance</p>
            <Button
              className="reset-button"
              variant="outlined"
              onClick={() => {
                setName('')
                setEmail('')
                setPassword('')
                dispatch(resetAuth()) // <-- reset any auth redux data
              }}
            >
              IAM Button
            </Button>
          </>
          }
        </Box>
      }

      {authStatus === constants.REGISTER_SUCCESS &&
      <Box display="flex" flexDirection="column" className="registration-error">
        <h2>Human</h2>
        <p>you have joined us</p>
        <p>welcome...</p>
        <p>please press button to login</p>
        <Button
          className="form-button"
          variant="outlined"
          color="primary"
          onClick={() => {
            dispatch(resetAuth())
            setIsLoginForm(true)
          }}
        >
          Back to Login
        </Button>
      </Box>
      }
    </>
  );
}

export default RegistrationForm;
