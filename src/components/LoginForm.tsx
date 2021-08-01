// eslint-disable-next-line
import React from 'react';

import { Box, Button, TextField } from '@material-ui/core';
import logo from '../brand_logo.svg';

interface ILoginFormProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationForm: React.FunctionComponent<ILoginFormProps> = (props: ILoginFormProps) => {
  const { setIsLoginForm } = props
  return (
    <form>
      <img src={logo} alt="this is the brand, baby" />
      <Box display="flex" flexDirection="column">
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
        <Button
          className="form-button"
          variant="contained"
          color="primary"
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
  );
}

export default RegistrationForm;
