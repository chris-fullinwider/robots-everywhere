import {
  Box, Button, TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import logo from '../brand_logo.svg';

interface IRegistrationFormProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationForm: React.FunctionComponent<IRegistrationFormProps> = (props: IRegistrationFormProps) => {
  const { setIsLoginForm } = props
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  return (
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
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <TextField
          value={confirmPassword}
          className="form-input"
          id="registration-password-confirm"
          label="Confirm Password"
          variant="outlined"
          color="primary"
          onChange={(evt) => setConfirmPassword(evt.target.value)}
        />
        <Button
          className="form-button"
          variant="contained"
          color="primary"
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
  );
}

export default RegistrationForm;
