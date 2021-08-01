import {
  Box, Button, TextField,
} from '@material-ui/core';
import React from 'react';
import logo from '../brand_logo.svg';

interface IRegistrationFormProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationForm: React.FunctionComponent<IRegistrationFormProps> = (props: IRegistrationFormProps) => {
  const { setIsLoginForm } = props
  return (
    <form>
      <img src={logo} alt="this is the brand, baby" />
      <Box display="flex" flexDirection="column">
        <TextField
          className="form-input"
          id="registration-name"
          label="Full Name"
          variant="outlined"
          color="primary"
        />
        <TextField
          className="form-input"
          id="registration-email"
          label="Email"
          variant="outlined"
          color="primary"
        />
        <TextField
          className="form-input"
          id="registration-password"
          label="Password"
          variant="outlined"
          color="primary"
        />
        <TextField
          className="form-input"
          id="registration-password-confirm"
          label="Confirm Password"
          variant="outlined"
          color="primary"
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
