// eslint-disable-next-line
import React, { useState } from 'react';

import { Box, Button, TextField } from '@material-ui/core';
import logo from '../brand_logo.svg';

interface ILoginFormProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationForm: React.FunctionComponent<ILoginFormProps> = (props: ILoginFormProps) => {
  const { setIsLoginForm } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form>
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
