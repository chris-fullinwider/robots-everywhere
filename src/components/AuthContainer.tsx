// eslint-disable-next-line
import React, { useState } from 'react';

import { Box } from '@material-ui/core';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './AuthContainer.scss';


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
