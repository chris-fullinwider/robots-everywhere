// eslint-disable-next-line
import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import './AuthContainer.scss';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

/**
 * contains the login and registration forms
 * @returns a container for all initial authing things
 */
const AuthContainer: React.FunctionComponent = () => {
  const [ isLoginForm, setIsLoginForm ] = useState(true)

  return (
    <Box display="flex" className="auth-container">
      { isLoginForm &&
        <LoginForm setIsLoginForm={setIsLoginForm} />
      }
      { !isLoginForm &&
        <RegistrationForm
          setIsLoginForm={setIsLoginForm}
        />
      }
    </Box>
  );
}

export default AuthContainer;
